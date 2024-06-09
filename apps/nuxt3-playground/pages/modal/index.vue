<script setup lang="ts">
import DialogModal from '@/components/modals/DialogModal.vue'
const modalIsOpen = ref(false)
const handleDialog = () => {
  modalIsOpen.value = !modalIsOpen.value
}
</script>

<template>
  <div>
    <button type="button" @click="handleDialog">Open Dialog</button>
    <DialogModal :open="modalIsOpen"></DialogModal>
  </div>
</template>
<style lang="scss" scoped></style>
