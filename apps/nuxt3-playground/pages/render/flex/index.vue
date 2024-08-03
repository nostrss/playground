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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.box {
  width: 33%;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
}

.box:nth-child(odd) {
  background-color: blue;
}

/* 짝수 항목 */
.box:nth-child(even) {
  background-color: green;
}
</style>
