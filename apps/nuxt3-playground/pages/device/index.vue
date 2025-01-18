<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDevicesList } from '@vueuse/core'

const { isSupported, audioInputs, audioOutputs, ensurePermissions, permissionGranted } = useDevicesList()

const selectedInput = ref<string | null>(null)
const selectedOutput = ref<string | null>(null)
const audioContext = ref<AudioContext | null>(null)
const mediaStreamSource = ref<MediaStreamAudioSourceNode | null>(null)
const audioDestination = ref<GainNode | null>(null)

onMounted(async () => {
  try {
    await ensurePermissions()
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)()

    // 페이지 로드 시 기본값을 선택된 장치로 설정
    const devices = await navigator.mediaDevices.enumerateDevices()

    const inputDevices = devices.filter(device => device.kind === 'audioinput')
    const outputDevices = devices.filter(device => device.kind === 'audiooutput')

    // 오디오 입력 장치 설정 (첫 번째 입력 장치를 기본 선택)
    if (inputDevices.length > 0) {
      selectedInput.value = inputDevices[0].deviceId
      await setInputDevice(inputDevices[0].deviceId)
    }

    // 오디오 출력 장치 설정 (첫 번째 출력 장치를 기본 선택)
    if (outputDevices.length > 0) {
      selectedOutput.value = outputDevices[0].deviceId
      await setOutputDevice(outputDevices[0].deviceId)
    }
  } catch (error) {
    console.error('Permissions error:', error)
  }
})

// 오디오 입력 장치 변경
const setInputDevice = async (deviceId: string) => {
  if (!audioContext.value) return

  // 이전에 생성한 MediaStreamAudioSourceNode가 있으면 해제
  if (mediaStreamSource.value) {
    mediaStreamSource.value.disconnect()
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId } })
    const source = audioContext.value.createMediaStreamSource(stream)
    mediaStreamSource.value = source

    // 입력 장치 변경 후 처리를 여기에 추가
    source.connect(audioContext.value.destination) // 기본적으로 오디오 출력을 브라우저의 기본 장치로 설정
  } catch (error) {
    console.error('Error accessing input device:', error)
  }
}

// 오디오 출력 장치 변경
const setOutputDevice = async (deviceId: string) => {
  if (!audioContext.value) return

  try {
    const destination = new AudioDestinationNode(audioContext.value, {
      channelCount: 2,
      channelCountMode: 'explicit',
      channelInterpretation: 'speakers',
    })

    // 여기서 오디오 출력을 특정 디바이스로 설정할 수 있음
    audioDestination.value = destination

    // 필요시, 출력 장치 변경 후 연결 설정을 여기에 추가
  } catch (error) {
    console.error('Error accessing output device:', error)
  }
}
</script>

<template>
  <div>
    <h1>Devices</h1>
    {{ isSupported ? 'Supported' : 'Not supported' }}
    <button @click="() => ensurePermissions()">Request Permissions</button>
    <p v-if="permissionGranted">Permissions granted</p>

    <h2>Audio Inputs</h2>
    <select v-model="selectedInput" @change="() => setInputDevice(selectedInput)">
      <option v-for="device in audioInputs" :key="device.deviceId" :value="device.deviceId">
        {{ device.label || 'Unnamed device' }}
      </option>
    </select>

    <h2>Audio Outputs</h2>
    <select v-model="selectedOutput" @change="() => setOutputDevice(selectedOutput)">
      <option v-for="device in audioOutputs" :key="device.deviceId" :value="device.deviceId">
        {{ device.label || 'Unnamed device' }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
