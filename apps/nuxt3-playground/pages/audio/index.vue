<template>
  <div>
    <div v-if="isPreparing">마이크 녹음을 준비중...</div>
    <button :disabled="!hasPermission || isPreparing" @click="toggleRecording">
      {{ isRecording ? '녹음 중지' : '녹음 시작' }}
    </button>
    <!-- 음성 크기를 나타내는 원 -->
    <div v-if="isRecording" class="volume-circle">
      <div class="volume-fill" :style="volumeFillStyle"></div>
    </div>
    <div v-if="audioURL">
      <h3>녹음된 음성:</h3>
      <audio :src="audioURL" controls></audio>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  setup() {
    const hasPermission = ref(false)
    const isRecording = ref(false)
    const isPreparing = ref(true)
    const audioURL = ref(null)
    const mediaRecorder = ref(null)
    const audioChunks = []
    const volume = ref(0)
    let stream = null
    let audioContext = null
    let analyser = null
    let dataArray = null
    let animationId = null

    onMounted(async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        hasPermission.value = true
      } catch (error) {
        console.error('마이크 권한 요청 실패:', error)
        hasPermission.value = false
      } finally {
        isPreparing.value = false
      }
    })

    const toggleRecording = () => {
      if (!isRecording.value) {
        startRecording()
      } else {
        stopRecording()
      }
    }

    const startRecording = () => {
      audioChunks.length = 0
      mediaRecorder.value = new MediaRecorder(stream)
      mediaRecorder.value.ondataavailable = event => {
        audioChunks.push(event.data)
      }
      mediaRecorder.value.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        audioURL.value = URL.createObjectURL(audioBlob)
      }
      mediaRecorder.value.start()
      isRecording.value = true

      // 오디오 분석을 위한 설정
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const source = audioContext.createMediaStreamSource(stream)
      analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      dataArray = new Uint8Array(analyser.frequencyBinCount)
      source.connect(analyser)
      updateVolume()
    }

    const updateVolume = () => {
      analyser.getByteFrequencyData(dataArray)
      let sum = 0
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i]
      }
      const average = sum / dataArray.length
      volume.value = average / 255 // 0부터 1 사이의 값
      animationId = requestAnimationFrame(updateVolume)
    }

    const stopRecording = () => {
      mediaRecorder.value.stop()
      isRecording.value = false
      cancelAnimationFrame(animationId)
      if (audioContext) {
        audioContext.close()
      }
    }

    const volumeFillStyle = computed(() => {
      return {
        height: `${volume.value * 100}%`,
      }
    })

    return {
      hasPermission,
      isRecording,
      isPreparing,
      audioURL,
      toggleRecording,
      volume,
      volumeFillStyle,
    }
  },
}
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.volume-circle {
  width: 50px;
  height: 50px;
  background-color: green;
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
  background-color: blue;
  transition: height 0.1s linear;
}
</style>
