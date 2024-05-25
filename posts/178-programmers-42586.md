---
title: [프로그래머스] 스택/큐 - 기능개발 문제 풀이
description: 스택이나 큐를 사용하여 풀어야 하는데 사용하지 않고 풀었다. 언제 어떻게 사용해야 하는걸까..
date: 2023-11-05
tags: programmers, algorithm, javascript, stack, queue
---

코테 준비를 위해 `프로그래머스` 문제를 풀고 있다.

`자료구조`의 기본인 `스택과큐` 관련된 문제를 먼저 풀어보려고 한다.

[📌 스택/큐 - 기능개발 문제 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/42586)

## 풀이

일단 나의 문제풀이는 이렇다.

```js
function solution(progresses, speeds) {
  var answer = [];

  let copyProgresses = [...progresses];
  let copySpeeds = [...speeds];

  const addProgress = () => {
    const result = copyProgresses.map((progress, index) => {
      return progress + copySpeeds[index];
    });
    copyProgresses = [...result];
  };

  const countDeploy = () => {
    const tmpArray = [...copyProgresses];
    const length = tmpArray.length;
    let count = 0;
    for (let i = 0; i < length; i++) {
      if (tmpArray[i] >= 100) {
        copyProgresses.shift();
        copySpeeds.shift();
        count = count + 1;
      } else break;
    }

    if (count !== 0) {
      answer.push(count);
    }
  };

  while (copyProgresses.length > 0) {
    addProgress();
    countDeploy();
  }

  return answer;
}
```

일단 함수 2개를 선언하였다.

- addProgress : progresses에 speeds를 더해주는 함수
- countDeploy : 100이 넘는 progresses를 제거하고, answer에 넣어주는 함수

그리고 while문을 통해 progresses의 길이가 0이 될 때까지 반복하도록 하였다.

이렇게 문제를 풀었더니 일단 모든 테스트와 채점에서 통과하였다.

## 개선 및 문제점

### 개선할 사항

일단, progresses, speeds 파라미터를 받아서 새로운 변수에 할당하는 부분이 있다.

원본 데이터 정보가 필요할 수도 있을 것 같고, 파라미터를 직접 조작하는 것을 꺼리는 습관 때문에 일단은 이렇게 작업을 했다.

### 스택/큐 문제인데 스택이나 큐를 사용하지 않았다.

이 문제는 스택/큐를 사용하여 풀이하라는 문제인데.. 사용하지를 않고 풀었다.
어떻게 스택과 큐를 적용해야할지 고민해야 할 것 같다.

## chatgpt 풀이

```js
function solution(progresses, speeds) {
  const answer = [];

  while (progresses.length > 0) {
    // 진행상황 업데이트
    progresses = progresses.map((progress, index) => progress + speeds[index]);

    // 배포 가능한 작업 수 계산
    let count = 0;
    while (progresses.length > 0 && progresses[0] >= 100) {
      progresses.shift();
      speeds.shift();
      count++;
    }

    if (count > 0) {
      answer.push(count);
    }
  }

  return answer;
}
```

비슷한듯 좀 더 간결한데.. 파라미터를 직접 조작하고 있다. while문을 2번 사용하고 있다.

문제가 배열의 길이가 100개로 제한되어 있어서 그런지 while문을 2번 사용하더라도 효율성 테스트에서 통과하였다.

일단 풀리긴 해서 기분은 좋은데, 먼가 만족스럽게 풀지 못해서 아쉽다.
