---
title: [프로그래머스] 이분탐색(Binary-Search) - 입국심사
description: Binary Search를 알아도 적용을 못하면 의미가 없다.
date: 2023-11-17
tags: programmers, algorithm, javascript, binary-search
---

[📌 이분탐색(Binary-Search) - 입국심사 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/43238)

## 나의 풀이

```js
function solution(n, times) {
  let low = 1;
  let high = Math.max(...times) * n; // 가장 오래 걸리는 시간

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const people = times.reduce((acc, time) => acc + Math.floor(mid / time), 0);
    if (people < n) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
}
```

## 풀이 설명

풀이를 위한 코딩 시간보다.. 풀이방법을 찾아내는데 한참 시간이 걸렸던 문제였다.

```
제한사항
- 입국심사를 기다리는 사람은 1명 이상 1,000,000,000명 이하입니다.
- 각 심사관이 한 명을 심사하는데 걸리는 시간은 1분 이상 1,000,000,000분 이하입니다.
- 심사관은 1명 이상 100,000명 이하입니다.
```

문제의 주제가 `이분탐색(binary-search)` 이었기 때문에

위의 주어진 제한 사항을 보고 이분탐색을 심사관 배열에 적용해서 풀어야 겠다는 생각을 해버렸고

거기에서 한참을 막혀 나오질 못했다.

그러다 생각한 방법은 거꾸로 생각해보는 것이었다.

`이분탐색`을 심사관 배열이 아닌 `시간`에 적용해보자는 생각이었다.

그래서 `시간`을 기준으로 `이분탐색`을 적용했고 그 시간 내에 `심사관`들이 `심사`할 수 있는 `사람`의 수를 구했다.

어찌보면.. 시간을 대입하여 최소의 시간이 맞나?

아니면 또 다른 시간을 대입해서 맞나?

이렇게 문제를 푼 느낌이긴 하다.

풀고난뒤 다른분들의 풀이를 봐도 비슷한 걸로 봐서는 이 방식이 맞는 것 같다..

이론을 알아도.. 문제풀이에 적용을 못하면 의미가 없다는.. 느낌이 들었다.
