---
title: [프로그래머스] 탐욕법(Greedy) - 단속카메라
description: 과속은 탐욕이다. 탐욕법으로 과속차량 단속하기
date: 2023-11-16
tags: programmers, algorithm, javascript, greedy
---

[📌 탐욕법(Greedy) - 단속카메라 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/42884)

## 나의 풀이

```js
function solution(routes) {
  var answer = 0;
  // 겹치는 배열원소끼리 묶고 그 묶음의 개수를 구하자
  // 겹침 판별
  // [a,b] [c,d] a<c<b 면 겹친다
  // 겹침 구간 [c, Min(b,d)]

  routes.sort((a, b) => a[0] - b[0]);

  const isCross = (routeA, routeB) => {
    if (routeA[0] <= routeB[0] && routeB[0] <= routeA[1])
      return {
        area: [routeB[0], Math.min(routeA[1], routeB[1])],
        cross: true,
      };
    else
      return {
        area: [0, 0],
        cross: false,
      };
  };
  let crossArea = routes[0];

  for (let i = 0; i < routes.length - 1; i++) {
    const result = isCross(crossArea, routes[i + 1]);
    if (result.cross) {
      crossArea = result.area;
    } else {
      answer += 1;
      crossArea = routes[i + 1];
    }
  }
  return answer + 1;
}
```

## 나의 풀이 설명

1. 예시의 배열을 [[-20,-15], [-14,-5], [-18,-13], [-5,-3]], 오름차순으로 아래와 같이 정렬해주었다.

2. 정렬결과 : [[-20,-15], [-18,-13], [-14,-5], [-5,-3]]

3. 그리고 아래와 같이 알고리즘을 정리했다.

- 겹침 판별 : [-20,-15], [-18,-13]의 겹침 구간은 [-18,-15]이다.
- 그리고 다음 원소[-14,-5]와 이전 겹침구간[-18,-15]과 다시 겹침 판별했다.
- 겹침 판별이 false 일 때까지 이전까지 겹쳤던 원소들은 단속카메라가 필요하기 때문에 answer +1 을 해주고, 겹침구간을 다시 [-14,-5]로 초기화해준다.
- 이렇게 반복하면서 answer를 구한다.

즉, 겹치는 구간이 없을때까지 원소들을 Index 0부터 진행해 나간다.

그러다 겹치는 구간이 없는 경우가 발생하면 단속카메라를 설치하고, 다시 다음 원소부터 이 방법을 반복하면 문제가 풀렸다.
