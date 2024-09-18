class RecorderWorkletProcessor extends AudioWorkletProcessor {
    constructor() {
      super()
      this._buffer = []
      this.port.onmessage = event => {
        if (event.data.command === 'stop') {
          // 녹음 중지 시 처리
          this.port.postMessage({ eventType: 'stop' })
        }
      }
    }
  
    process(inputs, outputs, parameters) {
      const input = inputs[0]
      if (input && input[0]) {
        // 입력된 오디오 데이터를 복사하여 포트로 전송
        const inputData = input[0]
        const buffer = new Float32Array(inputData.length)
        buffer.set(inputData)
        this.port.postMessage({ eventType: 'data', buffer })
      }
      return true
    }
  }
  
  registerProcessor('recorder-worklet', RecorderWorkletProcessor)
  