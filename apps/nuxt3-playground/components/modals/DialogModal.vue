<script setup lang="ts">
const props = defineProps<{
  open: boolean
  onClose: () => void
  teleportTo?: string
}>()

const modalRef = ref<HTMLDialogElement | null>(null)
const teleportSelector = computed(() => {
  return props.teleportTo ?? '#teleports'
})
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
  <Teleport :to="teleportSelector">
    <dialog ref="modalRef">
      <form method="dialog">
        <slot />
      </form>
    </dialog>
  </Teleport>
</template>
<style lang="scss" scoped></style>
