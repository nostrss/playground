---
title: reduce 사용법 정리
description: 자주 쓰지 않아서 까먹은 reduce 사용법을 정리
tags: javascript reduce
date: 2023-07-11
---

좀 처럼 프론트엔드 실무를 하면서는 자주 사용할 기회가 없었던 메소드가 바로 reduce였다.

얼마 전 지인의 코드를 수정해주다가 reduce를 사용한 부분이 있어서 정리해봤다.

## 등차수열

갑자기 등차수열이 왜 나오냐고? 라고 생각할 수 있지만, reduce를 사용하면서 등차수열을 공식과 연관지어 생각하니 이해가 쉬워져서 예시를 들었다.

### 등차수열 공식

```text
a(n) = a(1) + (n - 1) * d
```

등차 수열의 공식은 위와 같다.

수열의 첫 항 a(1)이 있고 공차 d가 있다면, n번째 항은 위와 같이 구할 수 있다.

이것을 reduce와 비교해보자.

### reduce

리듀스의 구문은 아래와 같다.

```js
 arr.reduce(callback[, initialValue])
```

callback은 필수값이고, initialValue는 옵션이다.

reduce 메소드는 initialValue 값에 callback 함수를 적용하여 하나의 결과값을 만들어낸다.

즉, 등차수열의 첫항 a(1)이 initialValue이고, 공차 d가 callback 함수라고 생각하면 이해가 쉽다.

mdn에 나와 있는 예시를 통해 살펴보자.

[mdn reduce 예시 ](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

```js
[0, 1, 2, 3, 4].reduce(function (
  accumulator,
  currentValue,
  currentIndex,
  array
) {
  return accumulator + currentValue;
},
10);
```

|  callback  | accumulator | currentValue | currentIndex |      array      | return value |
| :--------: | :---------: | :----------: | :----------: | :-------------: | :----------: |
| 1번째 호출 |     10      |      0       |      0       | [0, 1, 2, 3, 4] |      10      |
| 2번째 호출 |     10      |      1       |      1       | [0, 1, 2, 3, 4] |      11      |
| 3번째 호출 |     11      |      2       |      2       | [0, 1, 2, 3, 4] |      13      |
| 4번째 호출 |     13      |      3       |      3       | [0, 1, 2, 3, 4] |      16      |
| 5번째 호출 |     16      |      4       |      4       | [0, 1, 2, 3, 4] |      20      |

위의 표를 보면 이해가 쉽다.

initialValue가 10이고, callback 함수가 accumulator에 currentValue를 더해주는 형태이다.

즉, 등차수열에서 공차 d가 1이라고 생각하면, initialValue는 a(1)이고, callback 함수는 d가 된다.

물론 reduce가 등차수열로만 적용되는 것은 아니고 다양한 용도로 사용할 수 있지만, 이렇게 이해들 해두고 나머지는 응용을 하면 되겠다.
