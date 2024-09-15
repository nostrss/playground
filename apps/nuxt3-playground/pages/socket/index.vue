<script setup lang="ts">
import { ref } from 'vue'

const websocket = ref<WebSocket | null>(null)
const timerId = ref<number | NodeJS.Timeout | null>(null)

const websocketState = computed(() => {
  if (!websocket.value) return 'null'

  switch (websocket.value.readyState) {
    case WebSocket.CONNECTING:
      return 'CONNECTING'
    case WebSocket.OPEN:
      return 'OPEN'
    case WebSocket.CLOSING:
      return 'CLOSING'
    case WebSocket.CLOSED:
      return 'CLOSED'
    default:
      return 'UNKNOWN'
  }
})

const connectWebSocket = () => {
  websocket.value = new WebSocket('ws://localhost:8080')

  websocket.value.onopen = () => {
    console.log('WebSocket connected')
    timerId.value = setTimeout(() => {
      sendPing()
    }, 10000)
  }

  websocket.value.onmessage = event => {
    console.log(websocket.value?.readyState)
    console.log('Received:', event.data)
  }

  websocket.value.onclose = () => {
    console.log(timerId.value, 'clear')
    if (timerId.value) {
      clearTimeout(timerId.value)
      console.log('WebSocket disconnected')
    }
  }

  websocket.value.onerror = error => {
    console.error('WebSocket error:', error)
  }
}

const sendPing = () => {
  if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
    websocket.value.send(JSON.stringify('ping'))
    console.log('Ping sent')
  } else {
    console.error('WebSocket is not open')
  }
}

onMounted(() => {
  connectWebSocket()
})

onUnmounted(() => {
  if (websocket.value) {
    websocket.value.close()
  }
})
</script>

<template>
  <div>
    <button type="button" @click="sendPing">send ping</button>
    <p>{{ websocketState }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
