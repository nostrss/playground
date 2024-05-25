---
title: [프로그래머스] 스택/큐 - 다리를 지나는 트럭
description: Queue와 메소드를 이용해서 풀어보자
date: 2023-11-13
tags: programmers, algorithm, javascript, stack, queue
---

[📌 스택/큐 - 다리를 지나는 트럭 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/42583)

## 나의 풀이

```js
function solution(bridge_length, weight, truck_weights) {
  var answer = 0;

  const queue = new Queue(bridge_length);
  const completeValue = truck_weights.reduce((acc, cur) => acc + cur);
  let overTruckValue = 0;

  while (overTruckValue < completeValue) {
    // 현재 건너고 있는 트럭의 무게가 weight를 초과하는지 검사
    if (
      weight >=
      queue.weightSum + (truck_weights[0] === undefined ? 0 : truck_weights[0])
    ) {
      overTruckValue = overTruckValue + queue.enqueue(truck_weights.shift());
    } else {
      if (weight >= queue.sum() - queue.peek() + truck_weights[0]) {
        overTruckValue = overTruckValue + queue.enqueue(truck_weights.shift());
      } else {
        overTruckValue = overTruckValue + queue.enqueue(0);
      }
    }
    answer = answer + 1;
  }

  return answer;
}

class Queue {
  constructor(length) {
    this.items = new Array(length);
    this.items.fill(0);
    this.weightSum = 0;
  }
  enqueue(item) {
    const shiftValue = this.items.shift();
    this.items.push(item === undefined ? 0 : item);
    this.weightSum = this.sum();
    return shiftValue;
  }
  sum() {
    return (this.weightSum = this.items.reduce((acc, cur) => acc + cur));
  }
  peek() {
    return this.items[0];
  }
}
```

스택과 큐를 클래스로 미리 정의를 해두고 푸는 방법에 조금씩 익숙해지는 것 같다.

메소드도 문제에 필요한데로 정의를 해서 사용하니깐 훨씬 문제 풀기에 용이해 지는 것 같다.

빨리 코테 감을 잡자 시간이 부족하다!
