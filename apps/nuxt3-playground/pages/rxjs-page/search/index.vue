<template>
  <div>
    <input
      v-model="keywordRef"
      type="text"
      placeholder="Search..."
    />
    <div v-if="loading">Loading...</div>
    <article
      v-for="(name, index) in resultsRef"
      :key="index"
      @click="handleClick(name)"
      id="result"
    >
      {{ name }}
    </article>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Subject, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { debounceTime, distinctUntilChanged, filter, switchMap, retry, map, catchError, tap } from 'rxjs'
import { useSubject, useObservable } from '@vueuse/rxjs'

const loading = ref(false)

// 1) 검색어를 담을 Subject를 하나 만듭니다
const keyword$ = new Subject<string>()

// 2) `useSubject`로부터 Ref를 가져와서
//    v-model="keywordRef" 로 연결합니다.
const keywordRef = useSubject(keyword$)

// 3) 검색 결과를 담을 Observable Ref 생성
const resultsRef = useObservable(
  
    keyword$.pipe(
      filter(str => str.length > 1),  // 2글자 이상일 때만
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => { loading.value = true }),
      switchMap(text =>
        ajax.getJSON<{ first_name: string; last_name: string }[]>(
          `http://127.0.0.1:3000/people/quarter-error?name=${encodeURIComponent(text)}`
        ).pipe(
          retry(3), // 에러 시 3번 재시도
          catchError(err => {
            console.error('Search error:', err)
            return of([])
          })
        )
      ),
      map(res => res.map(person => `${person.first_name} ${person.last_name}`)),
      tap(() => { loading.value = false }),
    ),
  // 초기값
  {
    initialValue: [] as string[],
    onError: (err) => console.error(err),
  },
)

// 클릭 이벤트
const handleClick = (name: string) => {
  console.log('Clicked on: ', name)
}
</script>


<style scoped lang="scss">
body {
  padding: 12px;
  font-family: sans-serif;
}
#keyword {
  width: 200px;
  height: 24px;
  line-height: 24px;
  margin-bottom: 8px;
  padding: 2px 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
}
#result {
  width: 200px;
}
#result article {
  width: 192px;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  cursor: pointer;
}
#result article:not(:last-child) {
  border-bottom: 0;
}
#result article:first-child {
  border-radius: 4px 4px 0 0;
}
#result article:last-child {
  border-radius: 0 0 4px 4px;
}
#result article:hover {
  background-color: white;
  color: dodgerblue;
}
#result .searching {
  width: 192px;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  background-color: dodgerblue;
  color: white;
  border-radius: 4px;
}
</style>
