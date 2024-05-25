---
title: [프로그래머스] 스택/큐 - 주식거래
description: 100,000개의 배열문제 효율성 통과하기
date: 2023-11-14
tags: programmers, algorithm, javascript, stack, queue
---

[📌 스택/큐 - 주식거래 문제 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/42584)

## 나의 풀이 1 - 효율성 통과 X

```js
function solution(prices) {
  var answer = [];

  answer = prices.map((stock, index) => {
    const pricesArray = prices.slice(index, prices.length);
    const findResult = pricesArray.findIndex((items) => items < pricesArray[0]);
    return findResult === -1 ? pricesArray.length - 1 : findResult;
  });

  return answer;
}
```

처음 문제를 보고 쉽게 생각하고 위와 같이 풀었다.

<img width="751" alt="스크린샷 2023-11-15 오후 7 38 09" src="https://github.com/nostrss/next13-blog/assets/56717167/d6c7d631-e3ba-4c80-86c6-50f7935dcb40">

`정확성` 테스트는 통과했으나.. `효율성` 테스트를 전부 실패한 것을 볼 수 있다..

아무래도 `map`을 사용하고, 그안에서 `배열`을 또 생성하고, `findIndex`를 사용하는 것이 문제인 것 같다.

배열의 `최대 크기`가 `100,000` 이기 때문에 문제가 될 것 같아 배열을 생성하지 않고 다시 풀어보았다.

## 나의 풀이 2 - 효율성 통과 O

```js
function solution(prices) {
  var answer = [];

  answer = prices.map((stock, index) => {
    let findResult = 0;
    for (let i = index + 1; i < prices.length; i++) {
      if (stock > prices[i]) {
        findResult = i - index;
        return findResult;
      }
      findResult = i - index;
    }
    return findResult;
  });
  return answer;
}
```

<img width="751" alt="스크린샷 2023-11-15 오후 7 40 41" src="https://github.com/nostrss/next13-blog/assets/56717167/8f52140a-143d-409a-9cb3-382d4ef423d9">

배열을 새로 생성하지 않고 for문을 사용해서 불필요한 연산을 줄였더니 `효율성` 테스트를 통과할 수 있었다.

## 다른 풀이

지인이 문제를 보더니 풀어준 답안이다

```js
function solution(prices) {
  const n = prices.length;
  const answer = new Array(n).fill(0);

  const stack = [];

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
      const top = stack.pop();
      answer[top] = i - top;
    }
    stack.push(i);
  }

  while (stack.length > 0) {
    const top = stack.pop();
    answer[top] = n - 1 - top;
  }

  return answer;
}
```

<img width="751" alt="스크린샷 2023-11-15 오후 7 42 35" src="https://github.com/nostrss/next13-blog/assets/56717167/fa337f9c-b38b-49ed-9b3a-997ae9a799b4">

스택을 이용해서 풀었는데, 이렇게 풀어도 효율성 테스트를 통과할 수 있었다.

풀이방법이 이해하기 조금 난해한데.. 다시 한번 더 공부해봐야겠다.
