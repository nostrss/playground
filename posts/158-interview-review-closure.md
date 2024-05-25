---
title: [면접리뷰]클로저(Closure)란?
description: 어설프게 알고 면접보다 망했다. 다음엔 실수하지 말자!
date : 2023-09-06
tags: interview javascript closure
---

오늘 면접을 보면서 내가 이론 공부에 대해 개념적으로만 간단히 알고있다는 느낌을 받았다.

그래서 면접 질문에 대해서 복습차원에서 정리해보려고 한다.

## Step1: 클로저(Closure)란 무엇인가?

- MDN

  > 클로저는 주변 상태(어휘적 환경)에 대한 참조와 함께 묶인(포함된) 함수의 조합입니다. 즉, 클로저는 내부 함수에서 외부 함수의 범위에 대한 접근을 제공합니다. JavaScript에서 클로저는 함수 생성 시 함수가 생성될 때마다 생성됩니다.

- javascript.info

  > 클로저는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미합니다. 몇몇 언어에선 클로저를 구현하는 게 불가능하거나 특수한 방식으로 함수를 작성해야 클로저를 만들 수 있습니다. 하지만 자바스크립트에선 모든 함수가 자연스럽게 클로저가 됩니다.

- poiemaweb
  > 클로저(closure)는 자바스크립트에서 중요한 개념 중 하나로 자바스크립트에 관심을 가지고 있다면 한번쯤은 들어보았을 내용이다. execution context에 대한 사전 지식이 있으면 이해하기 어렵지 않은 개념이다. 클로저는 자바스크립트 고유의 개념이 아니라 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어(Functional Programming language: 얼랭(Erlnag), 스칼라(Scala), 하스켈(Haskell), 리스프(Lisp)…)에서 사용되는 중요한 특성이다.

내가 Javascript를 공부할때 자주 참고하는 사이트에서 클로저에 대한 설명을 가져왔다.

일단 위 내용의 주요 키워드는 이렇다.

- 외부함수, 외부변수, 내부함수, 내부함수
- 어휘적 환경(Lexical Scope)
- 자바스크립트 뿐만 아니라 다른 언어에서도 쓰이는 기법이자 개념이다.

```js
function init() {
  // 외부 함수
  var name = 'Mozilla'; // 외부 변수
  function displayName() {
    // 내부 함수, 클로저
    console.log(name); // 내부 함수에서 외부 변수 접근
  }
  displayName();
}

init(); // Mozilla
```

위의 코드에서 init() 함수가 실행되면 displayName() 함수가 실행된다.

이 때 외부 변수인 name에 접근하여 Mozilla가 출력된다.

이렇게 외부함수의 변수에 접근할 수 있는 내부함수를 클로저라고 부른다.

여기까지 이해한 내용은 이렇다.

> 클로저는 외부함수의 변수에 접근하는 내부함수이다.

## Q : 함수가 외부 변수에 접근하는 것은 당연한 것 아닌가?

위의 내용만 보면 단순히 내부 함수가 외부 함수의 변수에 접근하는 당연한 내용처럼만 보인다.

그런데 왜 클로저라는 별도의 네이밍을 하면서 이 개념을 정의해 놓은 것일까?

조금 더 클로저에 대해 알아보자

## Step2: 클로저 = 외부 변수 + 내부 함수

위의 코드를 아래와 같이 조금 변형해 보았다.

```js
function init() {
  // 외부 함수
  var name = 'Mozilla'; // 외부 변수
  function displayName() {
    // 내부 함수, 클로저
    console.log(name); // 내부 함수에서 외부 변수 접근
  }
  return displayName;
}

const showName = init();
console.log(showName);

// console.log 결과
// ƒ displayName() {
//     // 내부 함수, 클로저
//     console.log(name); // 내부 함수에서 외부 변수 접근
//   }

showName(); // Mozilla
```

console.log를 살펴보면 showName 변수에는 init함수의 return 값인 displayName 함수가 담겨있다.

그리고 showName을 실행하면 Mozilla가 출력되고 있다.

조금만 생각해보면 말이 안되는 상황인 것이다.

showName 함수에 name 변수가 없는데도 Mozilla가 출력되고 있는 것이다.

위 코드의 결과는 아래와 같이 해석할 수 있다.

```js
function displayName() {
  console.log(name);
}
displayName(); // Mozilla
```

name 변수가 선언도 되지 않았고, 할당도 되지 않았는데 Mozilla가 출력되고 있는 것이다.

앞서 클로저의 정의를 다시 살펴보자.

> 클로저는 주변 상태(어휘적 환경)에 대한 참조와 함께 묶인(포함된) 함수의 조합입니다.  
> 클로저는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미합니다.

단순히 외부함수에 접근하는 내부 변수가 아니라, 외부함수의 변수를 기억한다는 내용이 있다.

name 변수를 showName 함수가 기억하고 있기 때문에 Mozilla가 출력되고 있다고 말하고 있다.

즉, 클로저는 아래와 같은 모습이라는 것이다.

```js
const name = 'Mozilla';

function displayName() {
  console.log(name);
}
```

## Step3. 디버거로 클로저 직접 확인해보기

위에서는 클로저가 외부함수의 변수를 기억한다고 했다.

이걸 눈으로 직접 확인해보고 싶어졌다.

그래서 아래와 같이 디버거를 추가하고 브라우저에서 실행해보았다.

```js
function init() {
  // 외부 함수
  var name = 'Mozilla'; // 외부 변수
  function displayName() {
    // 내부 함수, 클로저
    debugger; // 디버거 추가!!
    console.log(name); // 내부 함수에서 외부 변수 접근
  }
  return displayName;
}

const showName = init();
showName();
```

<img width="871" alt="스크린샷 2023-09-12 오후 6 39 01" src="https://github.com/nostrss/next13-blog/assets/56717167/71c9ccf9-8c9d-4f4b-957a-51674a568f4d">

크롬브라우저 > 개발자도구 > Sources 탭에서 위와 같이 Closure 값을 확인할 수 있었다.

## Q : 모든 변수의 값이 클로저에 저장되는 것일까?

어떤 변수값에 대한 참조값이 클로저에 저장되는 것일까?

모든 변수값이 저장되면 비효율적이지 않을까 해서 테스트를 해보았다.

displayName 함수 외부에 age변수와 counter라는 함수를 선언하고 실행해보았다.
<img width="871" alt="스크린샷 2023-09-12 오후 7 50 29" src="https://github.com/nostrss/next13-blog/assets/56717167/baab2b45-c381-4c03-9eed-35e4e2e6cf99">

내부에서 사용하지 않는 변수는 클로저에 저장되지 않는 것을 확인할 수 있었다.

그럼 이번에는 displayName 함수안에서 age 변수와 counter 함수를 console.log로 출력해보았다. 예상대로라면 콜러저에 age와 counter가 포함되어 있을 것이다.

<img width="871" alt="스크린샷 2023-09-12 오후 7 55 20" src="https://github.com/nostrss/next13-blog/assets/56717167/65acf66b-a189-4635-bc1e-9c67178e9e43">

예상대로 클로저에 age변수와 함수까지 저장되는 것을 확인할 수 있었다.

이제 여기까지 이해한 내용을 다시 정리해 봐야겠다.

> 클로저란 : 외부함수 안에서 내부 함수가 선언될 때, 내부함수에서 사용되는 외부함수의 Lexical scope(어휘적 환경)를 함께 저장하는 것을 클로저라고 한다.

이전보다 조금 더 명확하게 정리가 되는 느낌이다.

다음에는 조금 더 심화된 내용을 정리해봐야 할 것 같다.
