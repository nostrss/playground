---
title: [면접리뷰]클로저(Closure)란? (2)
description: 다양한 예제를 보고 클로저에 대해 조금 더 이해해보자.
date: 2023-09-06
tags: interview javascript closure
---

이번에는 여러 사이트들의 예제들을 보면서 클로저에 대해 조금 더 이해해보려고 한다.

## MDN 예제

[🔗 MDN 클로저 바로가기 🔗](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)

```js
function makeAdder(x) {
  return function (y) {
    // debugger; 브라우저에서 실행 시 중단점
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```

특이한 코드이다. 이런 식으로 코드가 작성가능하구나 싶었다.

위 코드의 클로저를 확인해보자.

add5(2) 클로저가 생성된 모습이다.
클로저에 x: 5가 저장되어 있고, y: 2가 인자로 전달는 모습을 볼 수 있다.

<img width="871" alt="스크린샷 2023-09-12 오후 8 21 26" src="https://github.com/nostrss/next13-blog/assets/56717167/ce86c240-bcd9-46cd-b415-d4264dd1b5b4">

이번에는 add10(2) 클로저가 생성된 모습이다.
위와 마찬가지로 클로저에 x: 10이 저장되어 있고, y: 2가 인자로 전달는 모습을 볼 수 있다.
<img width="871" alt="스크린샷 2023-09-12 오후 8 25 18" src="https://github.com/nostrss/next13-blog/assets/56717167/9279fda2-1bd5-49d2-93f3-a8a72e5e5d00">

## javascript.info 예제

[🔗 javascript.info 클로저 바로가기🔗](https://ko.javascript.info/closure)

다음 예제에서 sayHi()의 결과는 John일까 Pete일까?

```js
let name = 'John';

function sayHi() {
  alert('Hi, ' + name);
}

name = 'Pete';

sayHi(); // what will it show: "John" or "Pete"?
```

나는 처음에 John이라고 생각했다가 결과를 보고 깜짝 놀랐다.  
정답은 Pete이다.

왜 그런지 위의 코드를 시간 순으로 브라우저에서 살펴보자.

- name에 John이 할당된다.
- name에 Pete가 할당된다.
- sayHi()가 호출된다.
- name 변수에 접근하여 alert을 띄운다.

즉, sayHi()가 호출되는 시점에 name 변수에는 Pete가 할당되어 있기 때문에 Pete가 출력되는 것을 볼 수 있었다.
