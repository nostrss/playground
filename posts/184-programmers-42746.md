---
title: [프로그래머스] 정렬 - 가장 큰 수
description: 때론 감으로 풀어서 맞는 경우도 있다...
date: 2023-11-15
tags: programmers, algorithm, javascript, sort
---

[📌 정렬 - H-Index 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/42746)

## 나의 풀이

```js
function solution(numbers) {
  var answer = '';

  const result = numbers
    .map((number) => String(number))
    .sort((a, b) => b + a - (a + b))
    .join('');

  return result[0] === '0' ? '0' : result;
}
```

솔직히 감으로 맞춰서 풀어본 문제이다.

모든 케이스를 다 테스트 통과할 거라고 생각치는 안았는데..

['1','2','3','10','11','12'].sort((a,b) => (b+a)-(a+b)) 이렇게 했을 때

['3','2','12','1','11','10'] 이렇게 나오는 것을 보고 감으로 풀어봤다.

... 이렇게 풀면 안되는데.. 통과가 되었다....
