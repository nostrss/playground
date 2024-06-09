<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const modalRef = ref<HTMLDialogElement | null>(null)
const handleDialog = () => {
  modalRef.value?.open ? modalRef.value?.close() : modalRef.value?.showModal()
}
</script>

<template>
  <dialog ref="modalRef" :open="props.open">
    <p>dialog contents</p>
    <button @click="handleDialog">Close</button>
  </dialog>
</template>
<style lang="scss" scoped></style>
