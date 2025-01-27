// webSocketWorker.ts

// ======= (선택) WebSocket 관련 타입 선언 =======
export interface WebSocketResponse<T = any> {
  meta: {
    code: number
    message?: string
    [key: string]: any
  }
  data?: T
  [key: string]: any
}

export type WebSocketStatus = 'CONNECTING' | 'OPEN' | 'CLOSED'

export const isSuccessResponse = (res: WebSocketResponse): boolean => {
  return res.meta.code === 200
}

// ======= Worker에서 사용할 설정 인터페이스 =======
export interface WorkerConfig {
  serviceName?: string
  autoReconnect?:
    | boolean
    | {
        interval?: number
        maxAttempts?: number
      }
  pingpong?: boolean | number
}

// ======= 메인 스레드 -> 워커 메시지 타입 =======
interface WorkerMessage {
  type: 'CONFIG' | 'OPEN' | 'CLOSE' | 'SEND'
  payload?: any
}

// ======= 워커 -> 메인 스레드 메시지 타입 =======
interface WorkerResponse {
  type: 'STATUS' | 'MESSAGE' | 'RESPONSE_ERROR' | 'ERROR' | 'FAIL'
  payload?: any
}

// ======= WebSocket 및 상태 변수 =======
let webSocket: WebSocket | null = null
let status: WebSocketStatus = 'CLOSED'

// ======= 기본값 상수 =======
const DEFAULT_RECONNECT_INTERVAL = 2000
const DEFAULT_MAX_RECONNECT_ATTEMPTS = 10
const DEFAULT_PING_INTERVAL = 50000

// ======= 설정값/상태 변수 =======
let serviceName = 'WebSocket'

// 재연결 옵션
let autoReconnectEnabled = false
let autoReconnectInterval = DEFAULT_RECONNECT_INTERVAL
let autoReconnectMaxAttempts = DEFAULT_MAX_RECONNECT_ATTEMPTS
let reconnectAttempts = 0
let reconnectTimeInterval = 0
let reconnectTimer: ReturnType<typeof setTimeout> | null = null

// 핑/퐁 옵션
let pingInterval = 0
let pingTimer: ReturnType<typeof setTimeout> | null = null

// ======= 워커 -> 메인 스레드 메시지 전송 유틸 =======
const postWorkerMessage = (message: WorkerResponse): void => {
  postMessage(message)
}

// ======= 재연결 타이머 클리어 =======
const clearReconnectTimer = (): void => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }
}

// ======= 핑 타이머 클리어 =======
const clearPingTimer = (): void => {
  if (pingTimer) {
    clearTimeout(pingTimer)
    pingTimer = null
  }
}

// ======= 재연결 리셋 =======
const resetReconnect = (): void => {
  if (!autoReconnectEnabled) return
  reconnectAttempts = 0
  reconnectTimeInterval = Math.random() * autoReconnectInterval
  clearReconnectTimer()
}

// ======= 재연결 시도 =======
const tryReconnect = (url: string): void => {
  if (!autoReconnectEnabled) return

  if (reconnectAttempts < autoReconnectMaxAttempts) {
    reconnectTimer = setTimeout(() => {
      initWebSocket(url)
    }, reconnectTimeInterval)
    reconnectAttempts++
    reconnectTimeInterval *= 2 // 지수 백오프
  } else {
    postWorkerMessage({
      type: 'FAIL',
      payload: `[${serviceName}] Max reconnect attempts reached`,
    })
  }
}

// ======= 핑/퐁 재개 =======
const resumePing = (): void => {
  if (pingInterval === 0 || !webSocket || status !== 'OPEN') return
  clearPingTimer()
  pingTimer = setTimeout(() => {
    webSocket?.send('ping')
  }, pingInterval)
}

// ======= WebSocket 초기화 & 이벤트 바인딩 =======
const initWebSocket = (url: string): void => {
  // 기존 소켓 닫고 새로 연결
  closeWebSocket()
  webSocket = new WebSocket(url)
  status = 'CONNECTING'
  postWorkerMessage({
    type: 'STATUS',
    payload: { status, serviceName },
  })

  if (!webSocket) return

  webSocket.onopen = () => {
    status = 'OPEN'
    postWorkerMessage({
      type: 'STATUS',
      payload: { status, serviceName },
    })
    console.log(`[${serviceName}] WS Connected`)
    resetReconnect()
    resumePing()
  }

  webSocket.onmessage = (event: MessageEvent) => {
    // ===== 핑/퐁 처리 =====
    if (event.data === 'pong') {
      clearPingTimer()
      resumePing()
      return
    }

    // ===== 메시지 파싱 & 에러 체크 =====
    let parsed: WebSocketResponse | undefined
    if (typeof event.data === 'string') {
      try {
        parsed = JSON.parse(event.data)
      } catch {
        // JSON이 아닐 수도 있으므로 무시
      }
    }

    // meta.code가 실패인 경우, 별도 에러 처리
    if (parsed?.meta && !isSuccessResponse(parsed)) {
      console.error(`[${serviceName}] WS error has occurred with code ${parsed.meta.code}:`, event)
      postWorkerMessage({
        type: 'RESPONSE_ERROR',
        payload: {
          code: parsed.meta.code,
          message: parsed.meta.message,
          raw: event.data,
        },
      })
      return
    }

    // 정상 메시지
    postWorkerMessage({
      type: 'MESSAGE',
      payload: event.data, // 혹은 JSON.parse(event.data)
    })
  }

  webSocket.onclose = (e: CloseEvent) => {
    status = 'CLOSED'
    postWorkerMessage({
      type: 'STATUS',
      payload: {
        status,
        serviceName,
        wasClean: e.wasClean,
        code: e.code,
        reason: e.reason,
      },
    })

    // 비정상 종료 시 재연결
    if (!e.wasClean) {
      console.warn(`[${serviceName}] WS Closed abnormally. Attempting reconnect...`)
      tryReconnect(url)
      return
    }
    console.log(`[${serviceName}] WS Closed normally`)
  }

  webSocket.onerror = (e: Event) => {
    const errorEvent = e as ErrorEvent
    postWorkerMessage({
      type: 'ERROR',
      payload: {
        serviceName,
        error: {
          type: errorEvent.type,
          message: errorEvent.message,
          filename: errorEvent.filename,
          lineno: errorEvent.lineno,
          colno: errorEvent.colno,
        },
      },
    })
    console.error(`[${serviceName}] WS error has occurred:`, e)
  }
}

// ======= WebSocket 닫기(수동) =======
const closeWebSocket = (code = 1000, reason?: string): void => {
  clearPingTimer()
  resetReconnect()
  if (webSocket) {
    webSocket.close(code, reason)
    webSocket = null
  }
}

// ======= 워커가 메인 스레드로부터 받는 메시지 처리 (화살표 함수) =======
onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { type, payload } = e.data

  switch (type) {
    case 'CONFIG': {
      const { serviceName: sName, autoReconnect, pingpong } = payload as WorkerConfig
      if (sName) {
        serviceName = sName
      }

      // ===== 재연결 옵션 반영 =====
      if (typeof autoReconnect === 'boolean') {
        autoReconnectEnabled = autoReconnect
        autoReconnectInterval = DEFAULT_RECONNECT_INTERVAL
        autoReconnectMaxAttempts = DEFAULT_MAX_RECONNECT_ATTEMPTS
      } else if (typeof autoReconnect === 'object') {
        autoReconnectEnabled = true
        autoReconnectInterval = autoReconnect.interval ?? DEFAULT_RECONNECT_INTERVAL
        autoReconnectMaxAttempts = autoReconnect.maxAttempts ?? DEFAULT_MAX_RECONNECT_ATTEMPTS
      }

      // ===== 핑/퐁 옵션 반영 =====
      if (typeof pingpong === 'boolean') {
        pingInterval = pingpong ? DEFAULT_PING_INTERVAL : 0
      } else if (typeof pingpong === 'number') {
        pingInterval = pingpong
      }
      break
    }

    case 'OPEN': {
      // payload로 받은 url로 WebSocket 연결
      if (typeof payload === 'string') {
        initWebSocket(payload)
      }
      break
    }

    case 'CLOSE': {
      // 수동 종료
      if (payload?.code) {
        closeWebSocket(payload.code, payload.reason)
      } else {
        closeWebSocket()
      }
      break
    }

    case 'SEND': {
      // 현재 OPEN 상태일 때만 전송
      if (webSocket && status === 'OPEN') {
        webSocket.send(payload)
      }
      break
    }
  }
}
