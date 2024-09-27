<template>
  <div id="app">
    <h1>Real-Time Speech-to-Text using Web Speech API (Composition API & TypeScript)</h1>
    <div>
      <button :disabled="isListening" @click="startListening">Start Listening</button>
      <button :disabled="!isListening" @click="stopListening">Stop Listening</button>
    </div>
    <div>
      <h3>Transcript:</h3>
      <p>{{ finalTranscript }}</p>
      <p class="interim">{{ interimTranscript }}</p>
      <!-- 실시간으로 변환 중인 텍스트 표시 -->
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  setup() {
    // Variables
    const finalTranscript = ref<string>('') // 확정된 텍스트 저장
    const interimTranscript = ref<string>('') // 실시간 텍스트(중간 결과) 저장
    const recognition = ref<SpeechRecognition | null>(null) // Web Speech API 객체
    const isListening = ref<boolean>(false) // 음성 인식 중인지 여부

    // Web Speech API 지원 여부 체크 및 설정
    const initializeSpeechRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        alert('Web Speech API is not supported in this browser.')
        return null
      }

      // SpeechRecognition 객체 생성 및 설정
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.lang = 'en-US' // 언어 설정 (한국어의 경우 'ko-KR')
      recognitionInstance.continuous = true // 계속해서 듣기
      recognitionInstance.interimResults = true // 중간 결과 표시
      return recognitionInstance
    }

    // 음성 인식 시작 함수
    const startListening = () => {
      if (recognition.value) {
        finalTranscript.value = '' // 확정된 텍스트 초기화
        interimTranscript.value = '' // 실시간 텍스트 초기화
        recognition.value.start() // 음성 인식 시작
        isListening.value = true
      }
    }

    // 음성 인식 종료 함수
    const stopListening = () => {
      if (recognition.value) {
        recognition.value.stop() // 음성 인식 중지
        isListening.value = false
      }
    }

    // onMounted Hook에서 Web Speech API 초기화
    onMounted(() => {
      const recognitionInstance = initializeSpeechRecognition()
      if (recognitionInstance) {
        recognition.value = recognitionInstance

        // 음성 인식 결과 처리
        recognition.value.onresult = (event: SpeechRecognitionEvent) => {
          interimTranscript.value = '' // 중간 결과 초기화

          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              // 확정된 텍스트
              finalTranscript.value += event.results[i][0].transcript + ' '
            } else {
              // 실시간 텍스트 (중간 결과)
              interimTranscript.value += event.results[i][0].transcript
            }
          }
        }

        // 인식 종료 시 처리
        recognition.value.onend = () => {
          isListening.value = false
        }

        // 에러 처리
        recognition.value.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event)
        }
      }
    })

    // onBeforeUnmount Hook에서 음성 인식 종료
    onBeforeUnmount(() => {
      if (recognition.value && isListening.value) {
        recognition.value.stop()
      }
    })

    return {
      finalTranscript,
      interimTranscript,
      isListening,
      startListening,
      stopListening,
    }
  },
}
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 50px;
}

button {
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
}

h3 {
  margin-top: 30px;
}

p {
  border: 1px solid #ddd;
  padding: 15px;
  width: 80%;
  margin: 0 auto;
  background-color: #f9f9f9;
  text-align: left;
}

.interim {
  color: gray;
  font-style: italic;
}
</style>
