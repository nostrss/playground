<script setup lang="ts">
import { ref } from 'vue'
import { WaveWorklet } from 'wave-worklet'

const recorder = ref<WaveWorklet | null>(null)
const audioUrl = ref<string | null>(null) // Blob URL을 저장할 ref
const audioPlayer = ref<HTMLAudioElement | null>(null) // audio 엘리먼트를 참조할 ref

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    })
    const context = new AudioContext()
    const source = context.createMediaStreamSource(stream)

    recorder.value = new WaveWorklet(context, source)
    await recorder.value.init()

    recorder.value.startRecording()
    console.log('Recording started')
  } catch (err) {
    console.error('Failed to start recording:', err)
  }
}

const stopRecording = async () => {
  if (!recorder.value) {
    console.error('Recorder가 초기화되지 않았습니다.')
    return
  }

  try {
    const wavBuffer = await recorder.value.stopRecording()
    const blob = new Blob([wavBuffer], { type: 'audio/wav' })
    const url = URL.createObjectURL(blob)

    console.log(url) // blob URL 확인
    audioUrl.value = url // audio URL 업데이트

    if (audioPlayer.value) {
      audioPlayer.value.src = url
    }
  } catch (err) {
    console.error('Failed to stop recording:', err)
  }
}
</script>

<template>
  <div>
    <button @click="startRecording">Start Recording</button>
    <button @click="stopRecording">Stop Recording</button>
    <br />
    <audio v-if="audioUrl" controls :src="audioUrl"></audio>
  </div>
</template>

<style lang="scss" scoped></style>
