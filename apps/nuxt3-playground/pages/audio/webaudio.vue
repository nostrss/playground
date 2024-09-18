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
    <div v-if="audioURLs.length">
      <h3>녹음된 음성들:</h3>
      <ul>
        <li v-for="(urlInfo, index) in audioURLs" :key="index">
          <p>{{ index + 1 }}번째 파일 ({{ urlInfo.duration }}초)</p>
          <audio :src="urlInfo.url" controls></audio>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'

export default {
  setup() {
    const hasPermission = ref(false)
    const isRecording = ref(false)
    const isPreparing = ref(true)
    const audioURLs = ref([]) // [{ url: '', duration: '' }]
    const audioChunks = ref([]) // 현재까지 수집된 오디오 데이터 조각들
    const volume = ref(0)
    let stream = null
    let audioContext = null
    let analyser = null
    let dataArray = null
    let audioWorkletNode = null
    let animationId = null
    let recordingStartTime = null
    let chunkStartTime = null
    let chunkTimer = null

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

    // 컴포넌트 언마운트 시 Blob URL 해제
    onUnmounted(() => {
      if (isRecording.value) {
        stopRecording()
      }
      // 모든 Blob URL 해제
      audioURLs.value.forEach(urlInfo => {
        URL.revokeObjectURL(urlInfo.url)
      })
      audioURLs.value = []
    })

    const toggleRecording = () => {
      if (!isRecording.value) {
        startRecording()
      } else {
        stopRecording()
      }
    }

    const startRecording = async () => {
      // 이전 Blob URL 해제
      audioURLs.value.forEach(urlInfo => {
        URL.revokeObjectURL(urlInfo.url)
      })
      audioURLs.value = []

      audioChunks.value = []
      recordingStartTime = Date.now()
      chunkStartTime = recordingStartTime

      audioContext = new (window.AudioContext || window.webkitAudioContext)()

      // AudioWorkletProcessor 등록
      try {
        await audioContext.audioWorklet.addModule('/recorderWorkletProcessor.js')
      } catch (error) {
        console.error('AudioWorklet 모듈 로드 실패:', error)
        return
      }

      const inputNode = audioContext.createMediaStreamSource(stream)
      analyser = audioContext.createAnalyser()
      analyser.fftSize = 2048
      dataArray = new Uint8Array(analyser.frequencyBinCount)

      audioWorkletNode = new AudioWorkletNode(audioContext, 'recorder-worklet')

      // 오디오 데이터 수신
      audioWorkletNode.port.onmessage = event => {
        if (event.data.eventType === 'data') {
          audioChunks.value.push(event.data.buffer)
        }
      }

      // 노드 연결
      inputNode.connect(analyser)
      analyser.connect(audioWorkletNode)
      audioWorkletNode.connect(audioContext.destination)

      isRecording.value = true
      updateVolume()
      startChunkTimer()
    }

    const startChunkTimer = () => {
      chunkTimer = setInterval(() => {
        saveChunk()
      }, 5000) // 5000 밀리초 = 5초
    }

    const saveChunk = () => {
      const currentTime = Date.now()
      const elapsedTime = (currentTime - chunkStartTime) / 1000 // 초 단위
      if (audioChunks.value.length > 0) {
        const audioBlob = exportWAV(audioChunks.value, 44100)
        const url = URL.createObjectURL(audioBlob)
        audioURLs.value.push({ url, duration: elapsedTime.toFixed(2) })
        audioChunks.value = []
        chunkStartTime = currentTime

        // 메모리 관리를 위해 오래된 Blob URL 해제 (예: 최대 100개 유지)
        if (audioURLs.value.length > 100) {
          const oldUrlInfo = audioURLs.value.shift()
          URL.revokeObjectURL(oldUrlInfo.url)
        }
      }
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

    const stopRecording = async () => {
      isRecording.value = false
      cancelAnimationFrame(animationId)
      clearInterval(chunkTimer)

      if (audioWorkletNode) {
        audioWorkletNode.port.postMessage({ command: 'stop' })
      }

      // 남은 오디오 데이터 저장
      saveChunk()

      // 오디오 컨텍스트 및 노드 정리
      if (analyser) {
        analyser.disconnect()
        analyser = null
      }
      if (audioWorkletNode) {
        audioWorkletNode.disconnect()
        audioWorkletNode = null
      }
      if (audioContext) {
        await audioContext.close()
        audioContext = null
      }
    }

    const exportWAV = (buffers, sampleRate) => {
      const interleaved = mergeBuffers(buffers)
      const dataview = encodeWAV(interleaved, sampleRate)
      const audioBlob = new Blob([dataview], { type: 'audio/wav' })
      return audioBlob
    }

    const mergeBuffers = bufferArray => {
      let length = 0
      bufferArray.forEach(buffer => {
        length += buffer.length
      })
      const result = new Float32Array(length)
      let offset = 0
      bufferArray.forEach(buffer => {
        result.set(buffer, offset)
        offset += buffer.length
      })
      return result
    }

    const encodeWAV = (samples, sampleRate) => {
      const buffer = new ArrayBuffer(44 + samples.length * 2)
      const view = new DataView(buffer)

      /* RIFF identifier */
      writeString(view, 0, 'RIFF')
      /* RIFF chunk length */
      view.setUint32(4, 36 + samples.length * 2, true)
      /* RIFF type */
      writeString(view, 8, 'WAVE')
      /* format chunk identifier */
      writeString(view, 12, 'fmt ')
      /* format chunk length */
      view.setUint32(16, 16, true)
      /* sample format (raw) */
      view.setUint16(20, 1, true)
      /* channel count */
      view.setUint16(22, 1, true)
      /* sample rate */
      view.setUint32(24, sampleRate, true)
      /* byte rate */
      view.setUint32(28, sampleRate * 2, true)
      /* block align */
      view.setUint16(32, 2, true)
      /* bits per sample */
      view.setUint16(34, 16, true)
      /* data chunk identifier */
      writeString(view, 36, 'data')
      /* data chunk length */
      view.setUint32(40, samples.length * 2, true)

      // PCM 샘플 작성
      floatTo16BitPCM(view, 44, samples)

      return view
    }

    const writeString = (view, offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }

    const floatTo16BitPCM = (output, offset, input) => {
      for (let i = 0; i < input.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, input[i]))
        s = s < 0 ? s * 0x8000 : s * 0x7fff
        output.setInt16(offset, s, true)
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
      audioURLs,
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
