---
title: [프로그래머스] 깊이/너비 우선 탐색(DFS/BFS) - 타겟 넘버
description: 처음 풀어본 DFS 문제, 재귀는 어렵다..
date: 2023-11-18
tags: programmers, algorithm, javascript, dfs
---

[📌 깊이/너비 우선 탐색(DFS/BFS) - 타겟 넘버 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/43165)

## 나의 풀이

```js
function solution(numbers, target) {
  var answer = 0;

  const dfs = (arr, index, sum) => {
    if (index === arr.length - 1) {
      if (target === sum + arr[index]) answer = answer + 1;
      if (target === sum - arr[index]) answer = answer + 1;
      return;
    }

    dfs(arr, index + 1, sum + -1 * arr[index]);
    dfs(arr, index + 1, sum + arr[index]);
  };

  dfs(numbers, 0, 0);
  return answer;
}
```

## 풀이 설명

처음 풀어본 DFS 문제였다.

풀고나서 이제 보니.. 쉬워보이는데, 처음에는 재귀적으로 푸는 연습을 많이 해보지 않아서

처음에 시작이 어려웠다..
