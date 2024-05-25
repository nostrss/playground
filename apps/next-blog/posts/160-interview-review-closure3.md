---
title: [면접리뷰]클로저(Closure)란? (3)
description: 클로저는 언제 사용하는가? 자주 사용해서 익숙해지자.
date: 2023-09-06
tags: interview javascript closure
---

이론적인 내용을 정리하고 이제는 실제로 어떻게 쓰이는지 알아보자.  
poiemaweb에서 클로저가 사용되는 예제가 있어서 가져와 봤다.  
[🔗 poiemaweb 클로저 바로가기 🔗](https://poiemaweb.com/js-closure)

## 1. 최신 상태유지

```js
<!DOCTYPE html>
<html>
<body>
  <button class="toggle">toggle</button>
  <div class="box" style="width: 100px; height: 100px; background: red;"></div>

  <script>
    var box = document.querySelector('.box');
    var toggleBtn = document.querySelector('.toggle');

    var toggle = (function () {
      var isShow = false;

      // ① 클로저를 반환
      return function () {
        box.style.display = isShow ? 'block' : 'none';
        // ③ 상태 변경
        isShow = !isShow;
      };
    })();

    // ② 이벤트 프로퍼티에 클로저를 할당
    toggleBtn.onclick = toggle;
  </script>
</body>
</html>
```

위의 코드는 버튼을 클릭하면 박스가 사라지고 나타나는 코드이다.

일반적으로 함수는 반환하고 즉시 소멸하기 때문에, 이때 함수 내부의 변수의 값도 소멸하게 된다.

하지만 위의 코드는 클로저를 사용하여 함수 내부의 변수를 최신으로 유지하고 있다.

그런데 그 기능이 마치 React에서 쓰던 useState와 비슷한 것 같다.

클로저로 useState를 구현 할 수 있지 않을까?

아래는 간단한 기능의 useState를 클로저로 구현해본 코드이다.

버튼을 클릭하면 console에 true, false가 번갈아가며 출력되도록 작업해봤다.

> isState값이 변경될 때 렌더링을 다시 일으키고 isColor값도 없데이트를 해줘야 하는데, 방법을 찾지 못해서 일단은 이렇게라도 흉내를 내보았다.

```jsx
export default function UseStateByClosure() {
  function useCustomState(initialState: any) {
    let state = initialState;

    const isState = () => state;
    const setState = () => {
      state = !isState();
      console.log(state);
    };

    return [isState(), setState];
  }

  const [isColor, setIsColor] = useCustomState(false);

  return (
    <div>
      <button type='button' onClick={() => setIsColor()}>
        클릭
      </button>
    </div>
  );
}
```

## 2. 전역변수 사용의 억제

전역변수의 경우 누구나 접근할 수 있기 때문에, 의도치 않게 값이 변경이 될 수 있다.

따라서 전역변수를 클로저를에 넣어서 사용하게 되면 외부에서 접근이 불가능하기 때문에 의도치 않은 값의 변경을 막을 수 있다.

## 3. 정보의 은닉화

이번에는 조금 다른 방식으로 클로저를 이용하는 방법에 대해서 알아보자.

아래는 생성자함수를 선언하고 new 연산자를 통해 새로운 객체를 생성하는 코드이다.

> 생성자 함수와 일반 함수에 기술적차이는 없다. 다만 생성자 함수는 아래 두 관례를 따른다고 한다.
> 함수이름의 첫글자는 대문자로 시작한다.
> 반드시 new 연산자를 사용하여 실행한다.

```js
function Counter() {
  // 카운트를 유지하기 위한 자유 변수
  let hiddenCounter = 0;

  // 클로저
  this.increase = function () {
    return ++hiddenCounter;
  };

  // 클로저
  this.decrease = function () {
    return --hiddenCounter;
  };
}

const myCounter = new Counter();

console.log(myCounter); // Counter { increase: f, decrease: f }
console.log(myCounter.increase()); // 1
console.log(myCounter.decrease()); // 0
```

위의 console.log에서 보듯이 직접 Counter 내부에 생성된 변수 hiddenCounter에 외부에서 직접 접근을 할 수가 없게 된다.

이렇게 되면 외부에서는 increase, decrease 함수를 통해서만 hiddenCounter에 접근이 가능하게 된다.

이를 통해 다른 클래스 기반의 언어에서 말하는 정보의 은닉화를 어느정도 구현할 수가 있다.

> 주의 : 아래와 같이 this에 바인딩되어 있으면 외부에서 접근이 가능해진다.

```js
function Counter() {
  // 카운트를 유지하기 위한 자유 변수
  this.hiddenCounter = 0;

  // 클로저
  this.increase = function () {
    return ++this.hiddenCounter;
  };

  // 클로저
  this.decrease = function () {
    return --this.hiddenCounter;
  };
}

const myCounter = new Counter();

console.log(myCounter); // Counter { hiddenCounter: 0, increase: f, decrease: f }
console.log(myCounter.increase()); // 1
console.log(myCounter.decrease()); // 0
```

알아두면 유용할 기법인 것 같다. 나중에 기억해두었다가 사용할 경우가 있으면 적용해봐야겠다.
