---
title: [프로그래머스] 깊이/너비 우선 탐색(DFS/BFS) - 게임 맵 최단거리
description: 이번엔 BFS 문제다.. x,y가 너무 헷갈렸다..
date: 2023-11-18
tags: programmers, algorithm, javascript, dfs, bfs
---

[📌 깊이/너비 우선 탐색(DFS/BFS) - 게임 맴 최단거리 📌](https://school.programmers.co.kr/learn/courses/30/lessons/1844)

## 나의 풀이

```js
function solution(maps) {
  var answer = -1;
  let user = [0, 0];

  const n = maps.length;
  const m = maps[0].length;

  const goal = [n - 1, m - 1];
  const queue = new Queue();

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, 1, -1];

  queue.enq([0, 0, 1]);
  maps[0][0] = 0;
  while (queue.length !== 0) {
    const [deqx, deqy, count] = queue.deq();
    if (deqx === goal[0] && deqy === goal[1]) return count;

    for (let i = 0; i < 4; i++) {
      const newx = deqx + dx[i];
      const newy = deqy + dy[i];

      if (newx > -1 && newx < n && newy > -1 && newy < m) {
        if (maps[newx][newy] === 1) {
          queue.enq([newx, newy, count + 1]);
          maps[newx][newy] = 0;
        }
      }
    }
  }

  return answer;
}

class Queue {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
    this.length = 0;
  }

  enq(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
    this.length = this.getLength();
  }

  deq() {
    const deqItem = this.items[this.headIndex];
    this.headIndex++;
    this.length = this.getLength();
    return deqItem;
  }

  getLength() {
    return this.tailIndex - this.headIndex;
  }
}
```

## 풀이 설명

x,y가 너무 헷갈렸다.. 한참 헤맸는데.. 생각해보니.. 전혀 필요가 없었던 것 같다..

`Queue` 같은 경우에는 배열이 아닌 객체를 이용해서 구현했다.

객체로 구현하는 것이 시간 복잡도에 유리하다고 해서 연습해봤다.

생각보다 시간이 너무 오래 걸렸다.. ㅠㅠ
