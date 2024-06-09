<script setup lang="ts">

const props = defineProps<{
  open: boolean
}>()

const clickClose = (event) => {
  console.log(event.target.value)
}

const clickConfirm = (event) => {
  console.log(event.target.value)
}
</script>
<template>
  <Teleport to="body">
    <dialog :open="props.open">
      <form method="dialog">
        <p>
          dialog contents
        </p>
        <button value="close" @click="clickClose">Close</button>
        <button value="confirm" @click="clickConfirm">Confirm</button>
      </form>
    </dialog>
  </Teleport>
</template>
<style lang="scss" scoped></style>
