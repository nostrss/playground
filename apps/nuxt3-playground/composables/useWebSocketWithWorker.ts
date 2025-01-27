// useWebSocketWithWorker.ts
import { ref, onBeforeUnmount, watch, type Ref } from 'vue'
import type { UseWebSocketOptions } from './useWebSocketWithWorker.type'
// Vite/Webpack 환경에 따라 ?worker 식으로 불러올 수 있음
import WebSocketWorker from '@/workers/webSocketWorker.ts?worker'

export interface UseWebSocketReturn {
  status: Ref<string>
  open: () => void
  close: (code?: number, reason?: string) => void
  send: (data: string | ArrayBuffer | Blob) => boolean
}

export const useWebSocketWithWorker = (
  url: Ref<string> | string,
  options: UseWebSocketOptions = {},
): UseWebSocketReturn => {
  const status = ref('CLOSED')
  let worker: Worker | null = null

  onMounted(() => {
    // ===== 1) 워커 생성 =====
    worker = new WebSocketWorker()
    // ===== 2) 워커 -> 메인 스레드 onmessage 처리 (화살표 함수) =====
    worker.onmessage = event => {
      const { type, payload } = event.data
      switch (type) {
        case 'STATUS':
          status.value = payload.status
          // 상태가 OPEN / CLOSED 등으로 바뀌었을 때 콜백 호출
          if (payload.status === 'OPEN') {
            options.onOpen?.(null as unknown as WebSocket)
          } else if (payload.status === 'CLOSED') {
            // CloseEvent와 비슷한 형태로 payload를 넘김
            options.onClose?.(
              null as unknown as WebSocket,
              {
                wasClean: payload.wasClean,
                code: payload.code,
                reason: payload.reason,
              } as CloseEvent,
            )
          }
          break

        case 'MESSAGE':
          // WebSocket으로부터 정상 메시지 수신
          options.onMessage?.(
            null as unknown as WebSocket,
            {
              data: payload,
            } as MessageEvent,
          )
          break

        case 'RESPONSE_ERROR':
          // 서버 응답이 에러인 경우 (meta.code !== 200 등)
          console.error(`[Worker] WS error with code ${payload.code}:`, payload.message)
          // 필요하다면 onError로 전달
          options.onError?.(
            null as unknown as WebSocket,
            new Error(`Response error code ${payload.code}: ${payload.message}`),
          )
          break

        case 'ERROR':
          // WebSocket 자체 에러
          console.error(`[Worker] WS error:`, payload.error)
          options.onError?.(null as unknown as WebSocket, payload.error as Event)
          break

        case 'FAIL':
          // 재연결 실패
          console.warn('[Worker] Reconnect failed:', payload)
          options.onFail?.()
          break
      }
    }

    // ===== 3) 초기 CONFIG 전송 =====
    worker.postMessage({
      type: 'CONFIG',
      payload: {
        serviceName: options.serviceName,
        autoReconnect: options.autoReconnect,
        pingpong: options.pingpong,
      },
    })
  })

  // ===== 4) open / close / send 메서드 (화살표 함수) =====
  const open = (): void => {
    if (!worker) return
    // 매번 open 시도 전 기존 연결 정리
    close()
    if (typeof url === 'string') {
      worker.postMessage({ type: 'OPEN', payload: url })
    } else {
      worker.postMessage({ type: 'OPEN', payload: url.value })
    }
  }

  const close = (code = 1000, reason?: string): void => {
    if (!worker) return
    worker.postMessage({ type: 'CLOSE', payload: { code, reason } })
  }

  const send = (data: string | ArrayBuffer | Blob): boolean => {
    if (status.value !== 'OPEN') {
      return false
    }
    if (!worker) return false
    worker.postMessage({ type: 'SEND', payload: data })
    return true
  }

  // ===== 5) url이 Ref라면, 변경 시 자동 재연결 =====
  if (typeof url !== 'string') {
    watch(url, () => {
      open()
    })
  }

  // ===== 6) 초기에 바로 open =====
  // open()

  // ===== 7) 컴포넌트 언마운트 시 정리 =====
  onBeforeUnmount(() => {
    close()
    worker?.terminate()
    worker = null
  })

  return {
    status,
    open,
    close,
    send,
  }
}
