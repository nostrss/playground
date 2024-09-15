<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'

const { status, data, send } = useWebSocket('ws://localhost:8080')
console.log(data.value)
</script>

<template>
  <div>
    <button type="button" @click="send(JSON.stringify('ping'))">send ping</button>
    <p>{{ status }}</p>
    <p>{{ data }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
