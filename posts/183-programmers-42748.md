---
title: [프로그래머스] 정렬 - k번째 수
description: 원본배열을 변경하는 메소드를 조심하자.
date: 2023-11-15
tags: programmers, algorithm, javascript, sort
---

[📌 정렬 - k번째 수 문제 보러가기 📌](https://school.programmers.co.kr/learn/courses/30/lessons/42748)

## 나의 풀이

```js
function solution(array, commands) {
  var answer = [];

  answer = commands.map((command) => {
    const result = array
      .slice(command[0] - 1, command[1])
      .sort((a, b) => a - b);
    return result[command[2] - 1];
  });

  return answer;
}
```

문제는 크게 어렵지 않다.

다만, `sort` 메소드의 경우 원본 배열을 수정하기 때문에 주의해야 한다.

실제 코테시.. 검색을 할 수 없을 경우 원본 데이터를 변경하는 메소드인지 아닌지..

이런 것들을 기억하고 있어야 할 것 같다.

매번 MDN을 통해서 확인하면서 개발을 했었는데.. 숙지하고 보지않고 푸는 버릇을 들여야겠다.
