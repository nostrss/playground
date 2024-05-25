---
title: [JS] Array.from() 사용하기
description: 아직도 모르는 것이 많은 자바스크립트. Array.from() 메소드를 사용해보자.
date: 2023-11-05
tags: javascript array from method
---

자바스크립트에서 많이 사용하는 배열(Array)에는 여러 메소드가 있다.

오늘은 그중 하나인 `Array.from(arrayLike, mapFn, thisArg)` 메소드를 학습해보려고 한다.

## Array.from(arrayLike, mapFn, thisArg) 메소드란?

[📌 MDN 공식 문서 보러가기 📌](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

> Array.from() 정적 메서드는 순회 가능 또는 유사 배열 객체에서 얕게 복사된 새로운 Array 인스턴스를 생성합니다.

직접 사용해보면서 익혀 보자.

먼저 유사배열 객체가 무엇인지 알아보자.

```js
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};
```

위와 같이 배열은 아니지만 키값이 인덱스로 되어 있고, 길이를 나타내는 length 속성을 가진 객체를 유사배열 객체라고 한다.

Array.from() 메소드는 배열 뿐만 아니라 이런 유사 배열 객체에도 사용할 수 있다.

## Array.from() 메소드 사용하기

### 문자열을 배열로 만들기

```js
console.log(Array.from('foo')); // ['f', 'o', 'o']
```

### 유사 배열 객체

```js
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};

const array = Array.from(arrayLike);
console.log(array); // ['a', 'b', 'c']
```

### Set 객체

```js
const set = new Set(['foo', 'bar', 'baz', 'foo']);
console.log(Array.from(set)); // ['foo', 'bar', 'baz']
```

## mapFn 사용하기

```js
// 화살표 함수를 map 함수로 사용하여 요소 조작
Array.from([1, 2, 3], (x) => x + x);
// [2, 4, 6]
```

```js
// 숫자 시퀀스 생성하기
// 배열의 각 위치가 `undefined`로 초기화되므로
// 아래 'v'의 값은 `undefined`가 됩니다.
Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]
```

### 2차원 배열 초기화 하기

```js
let arr2 = new Array(3);

for (let i = 0; i < arr2.length; i++) {
  arr2[i] = Array.from({ length: 4 }, (_, j) => i * 4 + j);
}

console.log(arr2);

//[
//  [ 0, 1, 2, 3 ],
//  [ 4, 5, 6, 7 ],
//  [ 8, 9, 10, 11 ]
//]
```

아직 사용법이 익숙하지 않지만 알아두면 코딩테스트에서 배열을 초기화 할때, 또는 객체를 배열로 바꿀때 등에서 유용하게 사용할 수 있을 것 같다.
