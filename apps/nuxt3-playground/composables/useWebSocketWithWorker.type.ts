// types.ts

export type WebSocketStatus = 'CONNECTING' | 'OPEN' | 'CLOSED'

export interface WebSocketResponse<T = any> {
  meta: {
    code: number
    message?: string
    [key: string]: any
  }
  data?: T
  [key: string]: any
}

export const isSuccessResponse = (res: WebSocketResponse): boolean => {
  return res.meta.code === 200
}

export interface UseWebSocketOptions {
  onOpen?: (ws: WebSocket) => void
  onClose?: (ws: WebSocket, event: CloseEvent) => void
  onError?: (ws: WebSocket, event: Event | any) => void
  onFail?: () => void
  onMessage?: (ws: WebSocket, event: MessageEvent) => void
  serviceName?: string
  autoReconnect?:
    | boolean
    | {
        interval?: number
        maxAttempts?: number
      }
  pingpong?: boolean | number
}
