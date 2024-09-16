// volumeWorker.js

self.onmessage = function (e) {
  if (e.data.type === 'start') {
    const interval = e.data.interval
    startTimer(interval)
  } else if (e.data.type === 'stop') {
    stopTimer()
  }
}

let timer = null

function startTimer(interval) {
  timer = self.setInterval(() => {
    self.postMessage({ type: 'update' })
  }, interval)
}

function stopTimer() {
  if (timer !== null) {
    self.clearInterval(timer)
    timer = null
  }
}
