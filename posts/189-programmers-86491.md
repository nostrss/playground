---
title: [프로그래머스] 완전탐색 - 최소직사각형
description: 내 코드가 허접하게 보이는 다른 사람의 풀이
date: 2023-11-18
tags: programmers, algorithm, javascript, 
---

[📌 완전탐색 - 최소직사각형 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/86491)

## 나의 풀이

```js
function solution(sizes) {
  var answer = 0;
  const wallet = {
    width: 0,
    height: 0,
  };

  const isWalletFit = (size) => {
    if (wallet.width >= size[0] && wallet.height >= size[1]) return true;
    else if (wallet.width >= size[1] && wallet.height >= size[0]) return true;
    else return false;
  };

  const returnWalletSize = (size) => {
    return {
      normalSize:
        Math.max(wallet.width, size[0]) * Math.max(wallet.height, size[1]),
      rotationSize:
        Math.max(wallet.width, size[1]) * Math.max(wallet.height, size[0]),
    };
  };

  const compareWallet = (size) => {
    const { normalSize, rotationSize } = returnWalletSize(size);
    if (normalSize >= rotationSize) {
      wallet.width = Math.max(wallet.width, size[1]);
      wallet.height = Math.max(wallet.height, size[0]);
    } else {
      wallet.width = Math.max(wallet.width, size[0]);
      wallet.height = Math.max(wallet.height, size[1]);
    }
  };

  sizes.forEach((size) => {
    if (!isWalletFit(size)) {
      compareWallet(size);
    }
  });

  return (answer = wallet.width * wallet.height);
}
```

## 풀이 설명

사실 문제는 어렵지 않았다.

금방 풀었는데, 다른 사람의 풀이를 보고 깜짝 놀랐다.

```js
function solution(sizes) {
  const [hor, ver] = sizes.reduce(
    ([h, v], [a, b]) => [
      Math.max(h, Math.max(a, b)),
      Math.max(v, Math.min(a, b)),
    ],
    [0, 0]
  );
  return hor * ver;
}
```

이렇게 간단히 푸신 분이 계셨는데.. 정말이지 나의 30줄을 10줄도 안되게 간단하게 풀어버리셨다.

`reduce`와 `구조분해할당`을 이용해서 이렇게 풀다니..

아직 갈길이 멀다..
