<script setup lang="ts">
import { ref } from 'vue'
import { fromEvent, throttleTime, scan } from 'rxjs';
const countRef = ref(0)

const onClick = () => {
  fromEvent(document, 'click')
    .pipe(
      throttleTime(3000),
      scan((count) => count + 1, 0)
    )
    .subscribe((count) => console.log(`clicked ${count} times`))
}


</script>

<template>
  <div>
    <button @click="onClick">start</button>
    <h1>Count: {{ countRef }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
}
</style>
