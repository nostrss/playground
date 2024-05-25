---
title: [프로그래머스] 동적계획법(Dynamic Programming) - 정수 삼각형
description: DP 문제.. 드디어 풀었다..!
date: 2023-11-18
tags: programmers, algorithm, javascript, dynamic, dp
---

[📌 동적계획법(Dynamic Programming) - 정수 삼각형 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/43105)

## 나의 풀이

```js
function solution(triangle) {
  var answer = 0;
  const height = triangle.length;

  for (i = height - 1; i > 0; i--) {
    for (j = 0; j < triangle[i - 1].length; j++) {
      const left = triangle[i][j] + triangle[i - 1][j];
      const right = triangle[i][j + 1] + triangle[i - 1][j];
      triangle[i - 1][j] = Math.max(left, right);
    }
  }

  return (answer = triangle[0][0]);
}
```

## 풀이 설명

일단.. 삼각형을 위에서 아래로 내려오면서, 각각의 위치에서 최대값을 구현하려고 했다.

그런데 구현이 좀 어려워서 막혔다가, 삼각형을 `거꾸로` 돌려서 생각해봤다.

내가 생각한 방식을 그림으로 표현하면 이렇다.

```
4 5 2 6 5
 2 7 4 4
  8 1 0
   3 8
    7
```

위에서 밑으로 내려오면서 겹치는 구간이 있는데, 이땐 더 큰수를 선택하면 된다.

그리고 별도의 dp 배열은 만들지 않고 triangle 배열에 바로 값을 넣어주었다.

triangle 베열의 값은 아래와 같이 시간이 지날수록 갱신되어 최종적으로는 최대값만 남게된다.

```
[
  [ 7 ],
  [ 3, 8 ],
  [ 20, 13, 0 ],
  [ 7, 12, 10, 10 ],
  [ 4, 5, 2, 6, 5 ]
]
[
  [ 7 ],
  [ 3, 8 ],
  [ 20, 13, 10 ],
  [ 7, 12, 10, 10 ],
  [ 4, 5, 2, 6, 5 ]
]
[
  [ 7 ],
  [ 23, 8 ],
  [ 20, 13, 10 ],
  [ 7, 12, 10, 10 ],
  [ 4, 5, 2, 6, 5 ]
]
[
  [ 7 ],
  [ 23, 21 ],
  [ 20, 13, 10 ],
  [ 7, 12, 10, 10 ],
  [ 4, 5, 2, 6, 5 ]
]
[
  [ 30 ],
  [ 23, 21 ],
  [ 20, 13, 10 ],
  [ 7, 12, 10, 10 ],
  [ 4, 5, 2, 6, 5 ]
]
```

DP 문제에 대해 조금은 감을 잡은 듯한데.. 실전에서 잘 풀수 있을려나..?
