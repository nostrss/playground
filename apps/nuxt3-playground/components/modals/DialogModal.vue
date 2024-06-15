<script setup lang="ts">
const props = defineProps<{
  open: boolean
  onClose: () => void
}>()

const modalRef = ref<HTMLDialogElement | null>(null)

watch(props, newProps => {
  if (modalRef.value != null) {
    if (newProps.open === true) {
      modalRef.value.showModal()
    } else {
      modalRef.value.close()
      newProps.onClose()
    }
  }
})
</script>
<template>
  <Teleport to="#teleports">
    <dialog ref="modalRef" :open="props.open">
      <form method="dialog">
        <slot />
      </form>
    </dialog>
  </Teleport>
</template>
<style lang="scss" scoped></style>
