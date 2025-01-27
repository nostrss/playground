<template>
  <div>
    <input id="keyword" ref="inputRef" v-model="keyword" type="text" placeholder="Search..." />
    <br />
    <div id="result">
      <div v-if="loading" class="searching">Searching...</div>
      <article v-for="(name, index) in results" :key="index" @click="handleClick(name)">
        {{ name }}
      </article>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { fromEvent, Subscription, debounceTime, distinctUntilChanged, filter, map, switchMap, retry } from 'rxjs'
import { ajax } from 'rxjs/ajax'

// 반응형 상태
const keyword = ref('')
const results = ref<string[]>([])
const loading = ref(false)

// 입력 요소를 참조하기 위한 ref 선언
const inputRef = ref<HTMLInputElement | null>(null)

// 클릭 핸들러
const handleClick = (name: string) => {
  console.log(`Clicked on: ${name}`)
}

// AJAX 요청을 위한 URL
const url = 'http://127.0.0.1:3000/people/quarter-error'

// 구독을 저장할 변수
let subscription: Subscription

onMounted(() => {
  if (inputRef.value) {
    // 'keyup' 이벤트를 관찰하는 Observable 생성
    const keyup$ = fromEvent<KeyboardEvent>(inputRef.value, 'keyup').pipe(
      // 'Backspace' 키 이벤트 필터링
      filter(event => event.code !== 'Backspace'),
      // 입력 값 추출
      map(event => inputRef.value?.value || ''),
      // 입력 길이가 1보다 큰 경우에만 진행
      filter(typed => typed.length > 1),
      // 500ms 동안 입력이 없을 때만 진행
      debounceTime(500),
      // 이전 값과 다른 경우에만 진행
      distinctUntilChanged(),
      // 새로운 검색어가 입력되면 이전 요청을 취소하고 새로운 요청 시작
      switchMap(searchTerm => {
        loading.value = true
        return ajax
          .getJSON<{ first_name: string; last_name: string }[]>(`${url}?name=${encodeURIComponent(searchTerm)}`)
          .pipe(
            retry(3), // 실패 시 최대 3번 재시도
          )
      }),
    )

    // Observable 구독
    subscription = keyup$.subscribe({
      next: response => {
        // 응답 데이터를 가공하여 결과에 저장
        results.value = response.map(person => `${person.first_name} ${person.last_name}`)
        loading.value = false
      },
      error: err => {
        console.error('Search error:', err)
        results.value = []
        loading.value = false
      },
    })
  }
})

onBeforeUnmount(() => {
  // 컴포넌트 언마운트 시 구독 해제
  if (subscription) {
    subscription.unsubscribe()
  }
})
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
