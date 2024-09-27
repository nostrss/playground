<template>
  <div id="app">
    <h1>Real-Time Speech-to-Text with Continuous Listening</h1>
    <div>
      <button :disabled="isListening" @click="startListening">Start Listening</button>
      <button :disabled="!isListening" @click="stopListening">Stop Listening</button>
    </div>
    <div>
      <label for="language">Select Language:</label>
      <select id="language" v-model="language" @change="changeLanguage">
        <option value="en-US">English</option>
        <option value="ko-KR">한국어</option>
        <option value="ja-JP">日本語</option>
      </select>
    </div>
    <div>
      <h3>Transcript:</h3>
      <p v-for="(segment, index) in transcriptSegments" :key="index">{{ segment }}</p>
      <!-- 각 세그먼트를 화면에 표시 -->
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
    const transcriptSegments = ref<string[]>([]) // 확정된 텍스트 세그먼트 배열
    const interimTranscript = ref<string>('') // 실시간 텍스트(중간 결과) 저장
    const recognition = ref<SpeechRecognition | null>(null) // Web Speech API 객체
    const isListening = ref<boolean>(false) // 음성 인식 중인지 여부
    const language = ref<string>('en-US') // 언어 선택

    // Web Speech API 지원 여부 체크 및 설정
    const initializeSpeechRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        alert('Web Speech API is not supported in this browser.')
        return null
      }

      // SpeechRecognition 객체 생성 및 설정
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.lang = language.value // 언어 설정
      recognitionInstance.continuous = false // 말이 끝나면 인식 종료됨
      recognitionInstance.interimResults = true // 중간 결과 표시
      return recognitionInstance
    }

    // 음성 인식 시작 함수
    const startListening = () => {
      if (recognition.value) {
        transcriptSegments.value = [] // 기존 세그먼트 초기화
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

    // 언어 변경 함수
    const changeLanguage = () => {
      if (recognition.value && isListening.value) {
        recognition.value.stop() // 언어를 변경할 때 음성 인식 중지
        recognition.value.lang = language.value // 새 언어로 변경
        recognition.value.start() // 음성 인식 다시 시작
      }
    }

    // 음성 인식 준비 (대화 반복)
    const restartRecognition = () => {
      if (recognition.value && isListening.value) {
        recognition.value.start() // 말이 끝난 후 다시 인식 시작
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
              // 확정된 텍스트를 세그먼트로 추가
              transcriptSegments.value.push(event.results[i][0].transcript)
            } else {
              // 실시간 텍스트 (중간 결과)
              interimTranscript.value = event.results[i][0].transcript
            }
          }
        }

        // 음성이 끝났을 때 처리 (speechend 이벤트)
        recognition.value.onspeechend = () => {
          // 중간 텍스트를 확정 텍스트로 저장
          if (interimTranscript.value) {
            transcriptSegments.value.push(interimTranscript.value)
            interimTranscript.value = '' // 실시간 텍스트 초기화
          }
          recognition.value.stop() // 일단 인식을 종료
        }

        // 인식 종료 시 다시 시작
        recognition.value.onend = () => {
          if (isListening.value) {
            restartRecognition() // 대화가 끝난 후 다시 대기 상태로
          }
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
      transcriptSegments,
      interimTranscript,
      isListening,
      language,
      startListening,
      stopListening,
      changeLanguage,
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

select {
  margin: 10px;
  padding: 5px;
}
</style>
