---
title: 복사 제대로 하고 있니?
description: 얕은 복사, 깊은 복사 복습하기
date: 2023-09-17
tags: javascript shallow deep copy
---

처음 자바스크립트를 공부할 때, 참조값을 복사하면 얕은 복사인 것으로 간단히 알고 넘어갔었다. 이에 대해 조금은 심도있게 알아보려고 한다.

## 얕은 복사(shallow copy)

MDN에서는 얕은 복사를 다음과 같이 정의하고 있다.

> 객체의 얕은 복사는 복사본의 속성이 복사본이 만들어진 원본 객체와 같은 참조 (메모리 내의 같은 값을 가리킴)를 공유하는 복사입니다. 따라서 원본이나 복사본을 변경하면, 다른 객체 또한 변경될 수 있습니다. 이러한 동작은 원본과 복사본이 완전히 독립적인 깊은 복사의 동작과 대조적입니다.

이를 코드를 통해 이해해보자.

```js
const user = {
  name: 'John',
  url: {
    twitter: 'https://twitter.com/john',
    facebook: 'https://facebook.com/john',
  },
};

const copyObject = (target) => {
  let result = {};
  for (let key in target) {
    result[key] = target[key];
  }
  return result;
};

const user2 = user;
const user3 = copyObject(user);
console.log(user === user2); // 1. ??
console.log(user === user3); // 2. ??
```

1. 답은 True이다.

- 우리가 가장 흔하게 볼 수 있는 얕은 복사의 형태이다.

2. 답은 False이다.

- `copyObject` 함수를 통해 새로운 객체를 만들었기 때문에 새로운 참조값을 가지게 된다.

> 그렇다면 user3의 경우에는 깊은 복사가 이루어진 것인가?

user3의 하위 프로퍼티들의 값을 변경해서 원본 객체의 값이 변경되는지 확인해보자.

아래와 같이 코드를 작성해서 실행해보았다.

```js
user3.name = 'Pete';
console.log(user.name); // John
console.log(user3.name); // Pete
```

user3의 값을 변경했으나 원본 객체의 값은 변경되지 않았다. 이번엔 하위 url 프로퍼티의 값을 변경해보자.

```js
user3.url.twitter = 'https://twitter.com/pete';
console.log(user.url.twitter); // https://twitter.com/pete
console.log(user3.url.twitter); // https://twitter.com/pete
```

하위 객체인 url의 경우에는 user3 객체의 값을 변경했을 때 원본인 user 객체까지 변경되는 것을 확인할 수 있었다.

이것은 user 하위의 url객체의 메모리상 주소값만이 복사되었기 때문이다.

> 즉 위의 케이스는 얕은 복사가 이루어진 것이다.

## 깊은 복사를 하는 방법

### JSON 객체 메서드 사용

객체를 JSON으로 변환하고 다시 객체로 변환하는 방법이다.

```js
const user4 = JSON.parse(JSON.stringify(user));
user4.url.twitter = 'https://twitter.com/pete';
console.log(user4 === user); // false
console.log(user4.url === user.url); // false
console.log(user4.url.twitter === user.url.twitter); // falses
```

### 재귀함수를 사용하는 방법

```js
const copyObject = (target) => {
  let result = {};
  if (typeof target === 'object' && target !== null) {
    for (let key in target) {
      result[key] = copyObject(target[key]);
    }
  } else {
    result = target;
  }
  return result;
};

const user5 = copyObject(user);
user5.url.twitter = 'https://twitter.com/pete';
console.log(user5 === user); // false
console.log(user5.url.twitter === user.url.twitter); // false
```

### lodash.js cloneDeep 메서드 사용

많이 사용하는 라이브러리인 lodash의 cloneDeep 메서드를 사용하는 방법이다.

```js
var objects = [{ a: 1 }, { b: 2 }];

var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
```

### immer.js 또는 Immutable.js 라이브러리 사용

```js
import { produce } from 'immer';

const nextState = produce(baseState, (draft) => {
  draft[1].done = true;
  draft.push({ title: 'Tweet about it' });
});
```

Immutable.js 는 페이스북에서 만든 패키지인데, 요샌 immer.js를 많이 사용한다고 한다.
