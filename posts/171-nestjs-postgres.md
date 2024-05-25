---
title: Nest.js에 Postgres DB를 연결해보자.
description: Docker Container에 Postgres를 설치하고 typeorm으로 Nest.js와 연동해보자
date: 2023-10-04
tags: nestjs docker postgres typeorm
---

이제 `Nest.js`에서 사용할 DB를 설치 및 연결해보려고 한다.

DB는 `Postgres`를 사용할 것이다. 이유는 딱히 정해진 것은 없는데, 왜인지 내가 찾은 블로그나 글들을 보면 `postgres`를 사용한 경우가 많았다.

[📌 Postgres 홈페이지 바로가기 📌](https://www.postgresql.org/)

`Postgres`가 `Nest.js`와 궁합이 잘 맞는건지 아직은 잘 모르겠다. 일단 `postgres`를 사용해보고 추후에는 `MySQL`로도 작업을 한번 해봐야 할 것 같다.

## Docker Container에 Postgres 설치하기

### Docker 설치하기

먼저 아래 링크로 이동하여 `Docker Desktop`을 설치해준다.

[📌 Docker 설치 페이지 바로가기📌](https://www.docker.com/get-started/)

<img width="873" alt="스크린샷 2023-10-05 오후 1 22 35" src="https://github.com/nostrss/server-fetchapi/assets/56717167/0e0307eb-441a-4ef7-9cba-4a7ad352d3ae">

### .docker-compose 파일을 작성, Container 생성하기

프로젝트 root 경로에 `.docker-compose.yml` 파일을 생성하고 아래와 같이 작성해주었다.

```text
version: '3.1'

volumes:
  postgres_data:

services:
  postgres:
    image: postgres:14.7
    container_name: postgres
    ports:
      - '5434:5432'
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

```

### Container 실행하기(띄우기)

터미널에서 아래 명령어를 입력하여 `Container`를 실행해준다.

```bash
docker-compose up -d
```

> 이때 docker desktop이 실행되어 있어야 한다.

<img width="787" alt="스크린샷 2023-10-05 오후 2 21 37" src="https://github.com/nostrss/server-fetchapi/assets/56717167/9d7ca6b4-53d3-43b0-9cff-b409f861e799">

그러면 `docker-compose.yml` 파일에 작성한대로 `postgres`가 `pull` 되고, `Container`가 생성된다.

`Container`를 내리기 위해서는 아래 명령어를 입력해주면 된다.

```bash
docker-compose down
```

### 생성된 Container 확인하기

터미널에서 아래 명령어를 입력하여 `Container`가 잘 생성되었는지 확인해보자.

```bash
docker ps --all
```

<img width="1107" alt="스크린샷 2023-10-05 오후 2 24 54" src="https://github.com/nostrss/server-fetchapi/assets/56717167/f23d60b6-5d0f-4b6c-8705-79919cd962ec">

터미널이 아니라 좀 전에 설치한 `Docker Desktop`에서도 확인할 수 있다.

<img width="1109" alt="스크린샷 2023-10-05 오후 2 26 48" src="https://github.com/nostrss/server-fetchapi/assets/56717167/7659d1b1-6098-4cda-9775-3a85ca9f1b65">

## typeorm 설치 및 설정하기

### typeorm 설치하기

이제 Nest.js에서 postgres를 사용하기 위해 `typeorm`을 설치하여 설정해주어야 한다.

아래와 같이 3개의 패키지를 설치해주자.

```bash
yarn add @nestjs/typeorm typeorm pg
```

### postgres.config.ts 파일 작성하기

`config`폴더를 생성하여 `postgres.config.ts` 파일을 생성해주고 아래와 같이 작성해주었다.

```ts
// src/config/postgres.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5434,
  database: process.env.POSTGRES_DATABASE || 'postgres',
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
}));
```

### app.module.ts 파일 수정하기

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import postgresConfig from './config/postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const obj: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get('postgres.host'),
          port: configService.get('postgres.port'),
          database: configService.get('postgres.database'),
          username: configService.get('postgres.username'),
          password: configService.get('postgres.password'),
          autoLoadEntities: true,
          logging: true,
          // prod에서는 사용하지 않는 것이 좋다.가급적이면 끄고 사용하길 추천한다.
          synchronize: false,
        };
        return obj;
      },
    }),
  ],
})
export class AppModule {}
```

여기서 `TypeOrmModuleOptions`의 `synchronize` 속성은 주의가 필요하다.

왜냐하면 `synchronize` 속성을 `true`로 설정하면 `Nest.js`가 실행될 때 수정된 `entity`를 자동으로 DB에 반영해주기 때문이다.

이로인해 예기치 않은 data의 손실과 에러가 발생할 수 있으므로, prod에서는 사용하지 않는 것이 좋다고 한다.

몇몇 글을 보면 개발 단계에서도 아예 `false`로 끄고 개발을 하는 것이 좋다고 한다.

> 이제 `Nest.js`에서 `postgres`를 사용할 준비가 끝났다.
