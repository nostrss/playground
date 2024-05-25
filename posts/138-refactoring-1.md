---
title: [책읽기]refactoring - 챕터 1
description: 사수가 없으니 책이라도 읽어보자.
tags: book refactoring javascript
date: 2023-05-07
---

## 샘플 코드

- [리팩토링 전 코드](https://github.com/nostrss/book-refactoring/tree/ef7e94134633027ad7a61d140184751e64422a16/chapter-01)

- [리팩토링 후 코드](https://github.com/nostrss/book-refactoring/tree/main/chapter-01)

## 챕터 1

저자는 자기가 명명한 리팩터링의 규칙과 기법(?)을 의거하며 샘플 코드를 리팩토링을 하는 법을 단계별로 보여준다.

예시를 통해서 리팩터링이 무엇인지 감을 잡는 챕터이다. 하지만..

> 아니 챕터1 부터 왜 이렇게 복잡하지?

라는 생각이 들게 한다.

그리고 눈으로만 코드를 보니 괄호가 눈에 잘 들어오지 않아서, 나는 저자의 코드를 직접 작성하면서 책을 정독했다.

챕터1만 보는데 반나절은 걸린 것 같다...

## 리팩터링 기법

저자는 앞으로 뒷장에서 더 자세히 리팩터링의 기법에 대해서 다룰 예정이라고 했지만, 몇가지 인상적인 내용이 있었다.

### 변수 인라인하기

**리팩터링 전**

```javascript
for (let perf of invoice.performances) {
  const play = playFor(perf);
  let thisAmout = amountFor(perf, play);
}
```

**리팩터링 후**

```javascript
for (let perf of invoice.performances) {
  // const play = playFor(perf);
  let thisAmout = amountFor(perf, playFor(perf));
}
```

저자는 위의 방식 대신 아래의 방식으로 리팩터링을 진행하며 이를 `변수 인라인하기`라고 부른다.

변수 `play`가 하나 제거 되기는 장점이 있긴 한데, 개인적으로는 그동안 위의 방식이 보기 좋아서 많이 사용했던 방식이었다.

왜 저자가 이렇게 수정을 하는지 궁금해지는 부분이다.

### 조건부 로직을 다형성으로 바꾸기

**리팩터링 전**

```javascript
function amountFor(aPerformance) {
  let result = 0;
  switch (aPerformance.play.type) {
    case 'tragedy': // 비극
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case 'comedy': // 희극
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
  }
  return result;
}
```

**리팩터링 후**

```javascript
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
```

저자는 switch를 이용한 조건부 로직을 다형성(polymorphism)을 활용하여 수정하였다.

현업에서도 조건에 따른 분기마다 별도의 로직을 적용해야 하는경우가 아주 많다.

그럴때면 if else 의 지옥에 빠져 엄청나게 긴 코드를 봐야 하는 경우가 많았다.

class 문법이 익숙하지 않은 나지만 현실적으로 아주 와 닿는 리팩터링 방법이었다.

## 후기

생각보다 단계별로 설명이 알차게 되어 있다. 무언가 책이 단단하고 알찬 느낌이다.

오래 걸릴 것 같긴한데 완독 해보자 ㅎㅎ
