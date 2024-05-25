---
title: [프로그래머스] 스택/큐 - 프로세스
description: Queue를 이용해서 프로세스를 구현해보자
date: 2023-11-13
tags: programmers, algorithm, javascript, stack, queue
---

[📌 스택/큐 - 프로세스 문제 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/42587)

## 나의 풀이

```js
function solution(priorities, location) {
  var answer = 0;
  const queue = priorities.map((item, index) => ({ index, item }));

  while (queue.length > 0) {
    const peek = queue.shift();
    const isBigNumber = queue.findIndex((queueItem) => {
      return queueItem.item > peek.item;
    });

    if (isBigNumber > -1) {
      queue.push(peek);
    } else {
      answer = answer + 1;
      if (peek.index === location) break;
    }
  }

  return answer;
}
```

처음에 문제를 보고 우선순위큐를 이용한 문제로 판단해서 `우선순위큐`를 구현하려고 했다.

그러나 계속 결과가 틀려서 문제를 다시 읽어보니 굳이 `우선순위큐`를 사용하지 않아도 되는 문제였다..

문제를 잘못 읽어서 시간을 많이 낭비했다.

## 문제 이해하기

[2, 1, 3, 2] 라는 배열이 있고, location이 2라고 가정하자.

이 경우 프로세스는 다음과 같이 진행된다.

1. 2꺼냄, [1,3,2] : 3이라는 숫자가 더 큰 숫자가 있으므로 다시 넣음
2. [1,3,2,2]
3. 1꺼냄 [3,2,2] : 3이라는 숫자가 더 큰 숫자가 있으므로 다시 넣음
4. [3,2,2,1]
5. 3꺼냄 [2,2,1] : 더 큰 숫자가 없고, location이 2에 해당하므로 종료
6. 3은 더이상 큐에 들어가지 않고 1번째로 실행되므로 1을 리턴

꺼냈던 priorities 배열의 원소가 다시 큐에 삽입되는 경우가 있는데, 이를 고려해야 했었다.

> 문제를 끝까지 제대로 이해하고 풀자!
