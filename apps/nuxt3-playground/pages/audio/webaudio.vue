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
    const hasPermission = ref(true) // 초기값을 true로 설정
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
    let wavWorker = null

    onMounted(() => {
      isPreparing.value = false
    })

    // 컴포넌트 언마운트 시 Blob URL 해제 및 마이크 스트림 정리
    onUnmounted(() => {
      if (isRecording.value) {
        stopRecording()
      } else if (stream) {
        // 녹음 중이 아니더라도 스트림이 존재하면 정리
        stream.getTracks().forEach(track => track.stop())
        stream = null
      }

      // 모든 Blob URL 해제
      audioURLs.value.forEach(urlInfo => {
        URL.revokeObjectURL(urlInfo.url)
      })
      audioURLs.value = []

      if (wavWorker) {
        wavWorker.terminate()
        wavWorker = null
      }
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

      // 마이크 스트림 요청
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        hasPermission.value = true
      } catch (error) {
        console.error('마이크 권한 요청 실패:', error)
        hasPermission.value = false
        return // 권한이 없으면 녹음 시작 중단
      }

      audioContext = new (window.AudioContext || window.webkitAudioContext)()

      // AudioWorkletProcessor 등록
      try {
        await audioContext.audioWorklet.addModule(new URL('./recorderWorkletProcessor.js', import.meta.url))
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

      // 여기서 wavWorker를 초기화합니다.
      if (window.Worker) {
        if (wavWorker) {
          wavWorker.terminate()
        }
        wavWorker = new Worker(new URL('./wavWorker.js', import.meta.url))

        // wavWorker로부터 결과 수신
        wavWorker.onmessage = e => {
          const { audioBlob, elapsedTime } = e.data
          const url = URL.createObjectURL(audioBlob)
          audioURLs.value.push({ url, duration: elapsedTime })

          // 메모리 관리 코드
          if (audioURLs.value.length > 100) {
            const oldUrlInfo = audioURLs.value.shift()
            URL.revokeObjectURL(oldUrlInfo.url)
          }
        }
      } else {
        console.error('이 브라우저에서는 Web Worker를 지원하지 않습니다.')
      }

      isRecording.value = true
      updateVolume()
      startChunkTimer()
    }

    const startChunkTimer = () => {
      const scheduleNextChunk = () => {
        saveChunk()
        chunkTimer = setTimeout(scheduleNextChunk, 5000)
      }
      scheduleNextChunk()
    }

    const stopChunkTimer = () => {
      if (chunkTimer) {
        clearTimeout(chunkTimer)
        chunkTimer = null
      }
    }

    const saveChunk = () => {
      const currentTime = Date.now()
      const elapsedTime = (currentTime - chunkStartTime) / 1000 // 초 단위

      if (audioChunks.value.length > 0) {
        const buffers = audioChunks.value.map(buffer => buffer.buffer)
        if (wavWorker) {
          wavWorker.postMessage(
            {
              buffers,
              sampleRate: audioContext.sampleRate,
              elapsedTime: elapsedTime.toFixed(2),
            },
            buffers, // Transferable objects
          )
        } else {
          console.error('Web Worker를 지원하지 않는 브라우저입니다.')
        }
        audioChunks.value = []
        chunkStartTime = currentTime // 여기에서 chunkStartTime을 갱신
      }
    }

    const updateVolume = () => {
      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray)
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }
        const average = sum / dataArray.length
        volume.value = average / 255 // 0부터 1 사이의 값
      }
      animationId = requestAnimationFrame(updateVolume)
    }

    const stopRecording = async () => {
      isRecording.value = false
      cancelAnimationFrame(animationId)
      stopChunkTimer()

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

      // 마이크 스트림 정리
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        stream = null
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
