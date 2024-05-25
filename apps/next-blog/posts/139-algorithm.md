---
title: [알고리즘]최대공약수와 최소공배수
description: 알아두면 쓸모 있을 것 같은 수학 
tags: algorithm javascript gcd lcm
date: 2023-06-23
---

최근 알고리즘 문제를 풀다가 최대공약수와 최소공배수를 활용하는 문제가 있었다.

문제를 풀긴 풀었지만, 최대공약수와 최소공배수의 경우에는 공식이 이미 존재하기 때문에

잘 알아두면 시간을 절약하기 좋을 것 같아서 정리해 보았다.

## 최대 공약수(greatest common divisor)

유클리드 호제법을 이용하여 최대 공약수를 구하는 방법을 코드로 구현해 보았다.

```javascript
const getGcd = (a, b) => {
  while (b > 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};
```

재귀적으로도 구현 가능할 것 같아 작성을 해봤다.

```javascript
const getGcd = (a, b) => {
  if (b === 0) {
    return a;
  }
  return getGcd(b, a % b);
};
```

## 최소 공배수(least common multiple)

최소 공배수는 위의 최대 공약수를 이용하면 쉽게 구할 수 있다.

```javascript
const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};
```
