---
title: [프로그래머스] 스택/큐 - 올바른 괄호 문제 풀이
description: 스택을 이용해서 괄호 검사를 해보자
date: 2023-11-05
tags: programmers, algorithm, javascript, stack, queue
---

[📌 스택/큐 - 올바른 괄호 문제 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/12909)

## 나의 풀이

```js
function solution(s) {
  const stack = new Stack();

  if (s[0] === ')') {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    if (stack.top() === '(' && s[i] === ')') stack.pop();
    else stack.push(s[i]);
  }

  return stack.isEmpty();
}

class Stack {
  constructor(stackArr) {
    this.stackArr = [];
  }

  push(item) {
    this.stackArr.push(item);
  }

  pop(item) {
    this.stackArr.pop(item);
  }

  top() {
    return this.stackArr[this.stackArr.length - 1];
  }

  isEmpty() {
    return this.stackArr.length === 0;
  }
}
```

Stack 클래스를 선언하고, push, pop, top, isEmpty 메소드를 구현하여 문제 풀이에 사용하였다.

이렇게 굳이 안풀어도 방법은 있겠지만, 이 문제의 의도에 맞게 풀려고 Stack 클래스를 구현하였다.

## 개선 및 문제점

<img width="751" alt="스크린샷 2023-11-08 오전 2 12 20" src="https://github.com/nostrss/next13-blog/assets/56717167/f1c28a70-4988-468c-8385-53155d9f2a75">

문제를 풀다보니 `효율성` 이라는 항목이 있는 걸 발견했다.

예전엔 이런 항목이 있는지 몰랐는데..

`시간복잡도`나 `공간복잡도`를 평가하는 항목인 것 같다.

앞으로는 이런 부분도 고려해서 문제를 풀어야 고득점을 받을 수 있을 것 같다....
