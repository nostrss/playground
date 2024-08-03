<script setup lang="ts">
const arr = Array.from({ length: 10000 }, (_, i) => i)
</script>

<template>
  <div class="container">
    <div v-for="(item, index) in arr" :key="index" class="box">
      {{ item }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: block;
}

.box {
  display: inline-block;
  width: calc(33.33% - 4px);
  border: 1px solid black;
  box-sizing: border-box;
  text-align: center;
  background-color: white;
  color: white;
}

.box:nth-child(odd) {
  background-color: blue;
}

.box:nth-child(even) {
  background-color: green;
}
</style>
