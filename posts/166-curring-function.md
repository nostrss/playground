---
title: 들어는 봤니? 커링함수(currying function)
description: 근데 React에서 커링함수는 언제 사용해야 할까?
date: 2023-09-18
tags: javascript currying function
---

커링함수란 여러개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인처럼 연결하는 것을 말한다.

그렇기 때문에 원칙적으로 하나의 파라미터만을 전달하는 것을 원칙으로 한다.

## 커링함수의 예시 살펴보기

```js
const curry3 = function (func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    };
  };
};

const getMaxWith10 = curry3(Math.max)(100);
console.log(getMaxWith10(51)); // 100
console.log(getMaxWith10(122)); // 122
```

위의 코드는 커링함수의 예시이다. 함수를 인자로 받고, 후속으로 받는 인자 2개에 대해 인자로 받은 함수를 실행한 값을 리턴한다.

위의 코드 실행과정을 아래와 같이 정리해봤다.

1. `curry3(Math.max)` : 아래의 익명함수를 리턴한다.

```
ƒ (a) {
    return function (b) {
      return Math.max(a, b);
    };
}
```

2. `curry3(Math.max)(100)` : 위의 익명함수를 실행하고 새로운 익명함수를 리턴한다.

```
ƒ (b) {
  return Math.max(100, b);
}

```

3. `const getMaxWith10 = curry3(Math.max)(100)`

- 위의 익명함수가 getMaxWith10에 할당된다.

4. `getMaxWith10(51)`

- getMaxWith10이 실행되고, 51이 인자로 전달되고, Math.max(100, 51)이 실행된다.

```
ƒ (51) {
  return Math.max(100, 51);
}
```

## 커링함수와 화살표 함수

위의 커링함수의 인자가 많아지거나, 길이가 길어지면 가독성이 떨어지는 단점이 있다. 이때 아래와 같이 화살표 함수를 사용하면 가독성을 높일 수 있다.

```js
const curry3 = (func) => (a) => (b) => func(a, b);
```

## 커링함수 언제? 왜 사용하는가?

커링함수는 당장 필요한 정보만 받아서 전달하고 또 필요한 정보가 들오면 전달하는 방식으로 사용할 수가 있다.

이를 함수형 프로그래밍에서는 `지연 실행(lazy execution)`이라고 한다.

`React`에서 실제로 위의 커링함수를 언제 사용할 수 있을지 고민을 해봤다.

```js
// 커링함수를 사용하지 않은 경우
const getInformation = (baseUrl, path, id) => fetch(`${baseUrl}${path}/${id}`);

// 커링함수
const getInformation = (baseUrl) => (path) => (id) =>
  fetch(`${baseUrl}${path}/${id}`);
```

위의 코드는 api를 호출하는 함수이다. 커링을 사용한 경우와 사용하지 않은 경우 결과값을 동일할 것이다.

이것만 봐서는 커링을 사용하는 명확한 가치를 느끼지는 못하겠다.

하지만 과거 공부했던 `HOC(Higher Order Component)`의 개념과 커링은 매우 비슷하게 느껴진다.

커링은 프로젝트에서 내가 실제로 의도해서 사용해본적은 없는 것 같다.

이후 프로젝트에서 커링을 사용해볼 수 있는 기회가 생긴다면 사용해보면서 익혀가야 할 것 같다.
