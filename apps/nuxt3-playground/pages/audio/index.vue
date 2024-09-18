<template>
  <div>
    <button :disabled="isPreparing" @click="toggleMicrophone">
      {{ isListening ? '마이크 종료' : '마이크 수신' }}
    </button>
    <!-- 음성 크기를 나타내는 원 -->
    <div v-if="isListening" class="volume-circle">
      <div class="volume-fill" :style="volumeFillStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const isListening = ref(false)
const isPreparing = ref(false)
const volume = ref(0)
let stream: MediaStream | null = null
let audioContext: AudioContext | null = null
let analyser: AnalyserNode | null = null
let dataArray: Uint8Array | null = null
let animationId: number

const startMicrophone = async () => {
  isPreparing.value = true
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  } catch (error) {
    console.error('마이크 권한 요청 실패:', error)
    isPreparing.value = false
    return
  }

  audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const inputNode = audioContext.createMediaStreamSource(stream)
  analyser = audioContext.createAnalyser()
  analyser.fftSize = 2048
  dataArray = new Uint8Array(analyser.fftSize)

  inputNode.connect(analyser)

  isListening.value = true
  isPreparing.value = false
  updateVolume()
}

const stopMicrophone = () => {
  isListening.value = false
  cancelAnimationFrame(animationId)

  if (analyser) {
    analyser.disconnect()
    analyser = null
  }
  if (audioContext) {
    audioContext.close()
    audioContext = null
  }
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
}

const toggleMicrophone = () => {
  if (!isListening.value) {
    startMicrophone()
  } else {
    stopMicrophone()
  }
}

const updateVolume = () => {
  if (analyser && dataArray) {
    analyser.getByteTimeDomainData(dataArray)
    let sum = 0
    for (let i = 0; i < dataArray.length; i++) {
      const v = (dataArray[i] - 128) / 128
      sum += v * v
    }
    const rms = Math.sqrt(sum / dataArray.length)
    // 볼륨 값을 지수로 조정하여 작은 소리도 감지되도록 함
    const calibratedVolume = Math.pow(rms, 1.5)
    // 볼륨 값의 스무딩 적용
    volume.value = volume.value * 0.8 + calibratedVolume * 0.2
    // 볼륨 값을 0과 1 사이로 제한
    volume.value = Math.min(Math.max(volume.value, 0), 1)

    // 다음 프레임 업데이트 예약
    animationId = requestAnimationFrame(updateVolume)
  }
}

const volumeFillStyle = computed(() => {
  return {
    height: `${volume.value * 100}%`,
  }
})

onUnmounted(() => {
  if (isListening.value) {
    stopMicrophone()
  }
})
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.volume-circle {
  width: 100px;
  height: 100px;
  background-color: green; /* 기본 배경색은 녹색 */
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  margin: 20px auto;
}

.volume-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: blue; /* 볼륨에 따라 채워질 색상은 파란색 */
  height: 0%;
  transition: height 0.1s linear;
}
</style>
