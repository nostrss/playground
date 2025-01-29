---
title: [Javascript] 이터러블(Iterable) 이터레이터(Iterator) 프로토콜
description: 순회 프로토콜에 대해서 알아보자.
date: 2025-01-29
tags: javascript, es6, iterable, iterator, protocol
---


## ES6에서의 순회
[for...of MDN 문서 바로가기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of)

아래는 for...of 문을 사용하여 배열을 순회하는 예제이다.

```javascript
const arr = [1, 2, 3];
for (const a of arr) {
  console.log(a);
}

// 1
// 2
// 3
```

기존 for문과 문법만 다르고 특이할 것이 없어 보이지만, 여기에는 눈에 보이지 않는 규약이 숨어 있다.

우리가 일반적으로 배열의 요소값을 조회할때는 `arr[0]`, `arr[1]`, `arr[2]`와 같이 인덱스를 사용하여 조회한다. 

하지만 for...of 문은 배열의 요소값을 조회할때 인덱스를 사용하지 않고 배열의 요소값을 조회한다. 

한번 확인해보자.

```javascript
const arr = [1, 2, 3];
arr[Symbol.iterator] = null;
for (const a of arr) {
  console.log(a);
}
```
위의 코드를 실행해보면 이런 에러가 나온다.
> Uncaught TypeError: arr is not iterable at index.html:5:19

그 이유는 for...of 문은 배열의 요소값을 조회할때 `arr[Symbol.iterator]`를 사용하는데, `arr[Symbol.iterator]`에 null을 할당 했기 때문이다.

그렇다면 `arr[Symbol.iterator]`에는 원래 무엇이 할당되어 있었을까? 

```javascript
const arr = [1, 2, 3];
let iterator = arr[Symbol.iterator];
console.log(iterator); // ƒ values() { [native code] }
for (const a of arr) {
  console.log(a);
}
```

`arr[Symbol.iterator]`에는 함수 `ƒ values() { [native code] }` 가 할당되어 있다. 이 함수는 배열의 요소값을 조회하는 함수이다. 그런데 내가 여기에 null을 할당해서 에러가 나오고 있었던 것이다.

그럼 그 함수를 한번 실행해보자자

```javascript
  const arr = [1, 2, 3]
  let iterator = arr[Symbol.iterator]()
  console.log('iterator.next :', iterator.next()) // {value: 1, done: false}
  for (const a of iterator) {
      console.log(a) // 2, 3
  }
```

[Symbol.iterator 반복자 프로토콜 MDN 문서 보러가기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#%EB%B0%98%EB%B3%B5%EC%9E%90_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)

`arr[Symbol.iterator]`는 이터레이터를 반환하는 함수이다. 이 함수를 실행하면 이터레이터 객체가 반환된다. 이터레이터 객체는 `next()` 메소드를 가지고 있으며, `next()` 메소드를 실행하면 `{value: 1, done: false}`와 같은 객체를 반환한다.

그리고 for...of 문은 이터레이터 객체의 `next()` 메소드를 실행하여 `{value: 1, done: false}`와 같은 객체를 받아와서 `value` 값을 조회한다고 이해하면 될 것 같다.

[이터러블 프로토콜 MDN 문서 보러가기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols)
이처럼 for...of 문은 기존의 for문과는 다르게 순회를 위한 규약이 숨어있다. 이 규약을 `이터러블 프로토콜`이라고 한다.
