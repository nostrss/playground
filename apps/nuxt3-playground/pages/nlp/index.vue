<script setup lang="ts">
import nlp from 'compromise'
import type { Term } from 'compromise/misc';

const input = ref('')
const tokens = ref<Term[][]>()

watch((input), (cur) => {
    tokens.value = [ ... nlp.tokenize(cur).document]
})

</script>

<template>
  <div>
    <textarea v-model="input" type="text" style="width: 100%; height: fit-content;" placeholder="enter text"/>
    <label for="">result</label>
    <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <p v-for="(token, index) in tokens" :key="index">
            <p v-for="(item, index) in token">{{ item }}</p>
        </p>
    </div>
  </div>
</template>

<style scoped></style>
