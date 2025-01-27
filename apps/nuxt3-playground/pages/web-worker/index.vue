<template>
  <div>
    <p>WebSocket Status: {{ status }}</p>
    <button @click="sendMessage">Send Message</button>
    <button @click="closeSocket">Close Socket</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useWebSocketWithWorker } from '@/composables/useWebSocketWithWorker'

const url = ref('ws://localhost:8080')

const { status, send, close, open } = useWebSocketWithWorker(url, {
  serviceName: 'MyService',
  autoReconnect: { interval: 2000, maxAttempts: 5 },
  pingpong: 30000,
  onOpen: () => {
    console.log('WebSocket OPENED')
  },
  onClose: (_, evt) => {
    console.log('WebSocket CLOSED', evt)
  },
  onMessage: (_, msgEvent) => {
    console.log('Message received:', msgEvent.data)
  },
  onError: (_, err) => {
    console.error('WebSocket ERROR:', err)
  },
  onFail: () => {
    console.error('Reconnection failed after max attempts')
  },
})

const sendMessage = () => {
  const success = send(JSON.stringify({ type: 'PING' }))
  if (!success) {
    console.warn('Failed to send message (WebSocket not open).')
  }
}

const closeSocket = () => {
  close()
}

onMounted(() => {
  open()
})
</script>
