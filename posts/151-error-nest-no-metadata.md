---
title: [Nest] ERROR [ExceptionsHandler] No metadata
description: 해결이 됐는데도 이유를 모르는 이 찝찝함이란..
tags: nestjs typeorm express error repository datasource
date: 2023-08-30
---

`Nest.js`에서 `typeorm`을 연결하여 사용하려고 하던 중 아래와 같은 에러가 발생했다.

```bash
[Nest] 87109  - 2023. 08. 29. 오후 9:41:15   ERROR [ExceptionsHandler] No metadata for "Board" was found.
EntityMetadataNotFoundError: No metadata for "Board" was found.
    at DataSource.getMetadata (/Users/jintaekwoo/github/private/fastcampus/simple-board/src/data-source/DataSource.ts:444:30)
    at Repository.get metadata [as metadata] (/Users/jintaekwoo/github/private/fastcampus/simple-board/src/repository/Repository.ts:53:40)
    at Repository.find (/Users/jintaekwoo/github/private/fastcampus/simple-board/src/repository/Repository.ts:524:39)
    at BoardService.findAll (/Users/jintaekwoo/github/private/fastcampus/simple-board/src/board/board.service.ts:35:33)
    at BoardController.findAll (/Users/jintaekwoo/github/private/fastcampus/simple-board/src/board/board.controller.ts:24:30)
    at /Users/jintaekwoo/github/private/fastcampus/simple-board/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at InterceptorsConsumer.intercept (/Users/jintaekwoo/github/private/fastcampus/simple-board/node_modules/@nestjs/core/interceptors/interceptors-consumer.js:11:20)
    at /Users/jintaekwoo/github/private/fastcampus/simple-board/node_modules/@nestjs/core/router/router-execution-context.js:46:60
    at /Users/jintaekwoo/github/private/fastcampus/simple-board/node_modules/@nestjs/core/router/router-proxy.js:9:23
    at Layer.handle [as handle_request] (/Users/jintaekwoo/github/private/fastcampus/simple-board/node_modules/express/lib/router/layer.js:95:5)
```

## 해결을 위한 시도

### @Entity() 누락

- `entitiy` 파일에 `@Entity()` 데코레이터가 누락여부 확인
- `Module`에 해당 `Entity`가 등록되어있는지 확인
- `typeorm` 버전 낮추기(0.3.17 => 0.2.X)
  - 버전을 낮추지 않고 수정해보기 위해 변경하지 않았다.
- typeorm `DataSource`의 entities 경로가 잘못되었는지 확인

### 해결(app.module.ts 수정)

```ts
// app.module.ts
// 변경전

@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '**********',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity.{.ts,.js}'],
      synchronize: false,
    }),
    BoardModule,
  ],
    controllers: [AppController],
  providers: [AppService],
})

// 변경후
@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

```

위와 같이 환경변수를 사용하도록 수정하니 정상적으로 동작하였다.

## 해결 됐지만 여전한 궁금증

> 환경변수를 사용하는 것과 하드코딩하는 것의 차이는 무엇일까
