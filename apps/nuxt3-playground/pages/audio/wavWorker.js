// wavWorker.js
self.onmessage = function (e) {
  const { buffers, sampleRate, elapsedTime } = e.data
  // ArrayBuffer 배열을 Float32Array 배열로 변환
  const float32Buffers = buffers.map(buffer => new Float32Array(buffer))
  const interleaved = mergeBuffers(float32Buffers)
  const dataview = encodeWAV(interleaved, sampleRate)
  const audioBlob = new Blob([dataview], { type: 'audio/wav' })
  self.postMessage({ audioBlob, elapsedTime })
}

function mergeBuffers(bufferArray) {
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

function encodeWAV(samples, sampleRate) {
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

  floatTo16BitPCM(view, 44, samples)

  return view
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

function floatTo16BitPCM(output, offset, input) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, input[i]))
    s = s < 0 ? s * 0x8000 : s * 0x7fff
    output.setInt16(offset, s, true)
  }
}
