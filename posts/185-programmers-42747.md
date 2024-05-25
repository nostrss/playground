---
title: [프로그래머스] 정렬 - H-Index
description: 때론 무식하게 푸는 것도 방법이다...
date: 2023-11-15
tags: programmers, algorithm, javascript, sort
---

[📌 정렬 - H-Index 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/42747)

## 나의 풀이

```js
function solution(citations) {
  const countArr = [];

  for (let i = 0; i <= 10000; i++) {
    if (citations.filter((item) => item >= i).length >= i) countArr.push(i);
  }

  return countArr.sort((a, b) => b - a)[0];
}
```

이렇게 풀어도 되는건지.. 모르겠다..

푸는 방법이 도대체 떠오르지 않아서.. 무식하게 풀어봤다.

제한사항

- 과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
- 논문별 인용 횟수는 0회 이상 10,000회 이하입니다.

배열의 길이가 그리 크지 않아서.. 모든 H-Index의 경우의 수를 구해서 가장 큰 H-Index를 구했다.

이렇게 해도 되는 걸까.. 수학적인 공식이 있을 것 같은데..

## 다른 풀이

chat Gpt를 통해서 다른 풀이를 구해보았다.

```js
function solution(citations) {
  citations.sort((a, b) => b - a);
  let hIndex = 0;

  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) {
      hIndex = i + 1;
    } else {
      break;
    }
  }
  return hIndex;
}
```

생각해보니 굳이 1부터 10,000까지 비교할 필요는 없었다..
왜 이 생각을 못했을까..
