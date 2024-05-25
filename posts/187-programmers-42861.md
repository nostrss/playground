---
title: [프로그래머스] 탐욕법(Greedy) - 섬 연결하기
description: 최소 신장 트리로 섬을 연결하자. (Feet. 크루스칼 알고리즘, Union-Find)
date: 2023-11-16
tags: programmers, algorithm, javascript, greedy, mst, kruskal, union-find
---

[📌 탐욕법(Greedy) - 섬 연결하기 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/42861)

## 나의 풀이

```js
function solution(n, costs) {
  var answer = 0;
  let edges = 0;

  costs.sort((a, b) => a[2] - b[2]);

  // n개 만큼 인덱스를 원소로 같은 배열 생성
  const unionArr = Array.from({ length: n }, (_, i) => i);

  const findParent = (child) => {
    if (unionArr[child] === child) return child;
    return (unionArr[child] = findParent(unionArr[child]));
  };

  const insertParent = (small, bigger) => {
    unionArr[bigger] = small;
  };

  for (let i = 0; i < costs.length; i++) {
    const [leftVertex, rightVertex] = costs[i];
    const minParent = Math.min(findParent(leftVertex), findParent(rightVertex));
    const maxParent = Math.max(findParent(leftVertex), findParent(rightVertex));

    if (minParent !== maxParent) {
      insertParent(minParent, maxParent);
      answer = answer + costs[i][2];
      edges = edges + 1;
    }
    // 선택한 간선의 개수가 n-1일때 종료
    if (edges === n - 1) break;
  }
  return answer;
}
```

## 풀이 설명

먼저 이 문제는 `크루스칼` 알고리즘으로 풀었다.

[📌 크루스칼(Kruskal) 알고리즘 보러가기 📌](https://ko.wikipedia.org/wiki/%ED%81%AC%EB%9F%AC%EC%8A%A4%EC%BB%AC_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)

`크루스칼` 알고리즘은 `최소 신장 트리`를 만드는 알고리즘으로 이 문제를 푸는데 제격이다.

`크루스칼` 알고리즘의 원리는 이렇다.

- `간선`의 `가중치`를 기준으로 오름차순 정렬한다.
- 가중치가 가장 작은 간선부터 선택한다.
- 선택한 간선이 `사이클`을 만들지 않는다면 선택한다.
- 선택한 간선의 개수가 `n-1`개가 될 때까지 반복한다.

이렇게 알고리즘을 작성하면 최소 신장 트리가 완성된다.

이때 사이클을 판별하는 방법은 `Union-Find` 알고리즘을 사용하는데..

오히려 이부분에서 시간을 많이 잡아먹었다.

좋은 글을 하나 찾아서 이 블로그를 참고하여 풀었다.

[📌 참고링크 📌](https://wikidocs.net/207012)

이런 문제는 몇 번 더 연습을 해서 숙달해야 할 것 같다.

면접도 준비해야하는데.. 알고리즘만 풀고 있네..ㅠ
