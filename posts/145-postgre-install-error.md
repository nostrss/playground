---
title: PostgresSQL 설치 시 "/tmp/.s.PGSQL.5432" 에러
description: 설치 에러가 제일 무서운 개발자
tags: nestjs node express javascript typescript
date: 2023-08-24
---

Nest.js를 공부하면서 Brew로 PostgresSQL을 설치하고 DB를 연결하려고 했는데 아래와 같은 에러가 발생했다.

```bash
psql postgres

psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: No such file or directory
```

검색을 해보니 다양한 결과들이 나왔다.

- 삭제 후 재설치 하는 방법
- 재부팅 하는 방법
- postgresql@13을 설치하는 방법(나는 14버전을 사용하고 싶었다.)

chatgpt도 사용해봤으나 전부 실패했다.

그러다 stackoverflow에서 아래와 같은 답변을 찾았다.

[stack overflow 원본링크](https://stackoverflow.com/questions/69754628/psql-error-connection-to-server-on-socket-tmp-s-pgsql-5432-failed-no-such)

위의 링크 중간에 보면 아래와 같은 답변이 있었다.

```bash
brew services start postgresql
```

위의 명령어를 실행하고 다시 psql을 실행하니 정상적으로 실행되었다.

```
psql postgres
```

개발은 처음에 설치와 환경설정이 제일 어렵다..
