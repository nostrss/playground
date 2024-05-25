---
title: Nest.js에 swagger 적용하기
description: 백엔드 문서화의 시작, swagger를 사용해보자
date: 2023-10-03
tags: nestjs docker swagger
---

프론트 작업을 할때 api 문서를 `postman` 또는 `swagger`로 백엔드와 소통하며 작업을 진행한적이 있었다. 이번에는 내가 그 문서를 설정하는 작업을 해보려고 한다.

[📌 Nest.js 문서 바로가기 📌](https://docs.nestjs.com/openapi/introduction#document-options)

## @nestjs/swagger 설치하기

`swagger` 문서를 만들기 위해서는 `@nestjs/swagger` 패키지가 필요하다.

```bash
yarn add @nestjs/swagger
```

## main.ts에 설정하기

그리고 아래와 같이 `main.ts`에 코드를 추가해주었다.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger 설정 시작
  const swaggerConfig = new DocumentBuilder()
    .setTitle('FetchApi') // 문서 제목
    .setDescription('FetchApi project API description') // 문서 설명
    .setVersion('1.0') // 문서 버전
    .addBearerAuth() // Authorization 버튼 활성화
    .build();

  // Authorization 유지 설정(새로고침해도 토큰이 날아가지 않도록)
  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, swaggerCustomOptions);

  // swagger 설정 끝

  await app.listen(3000);
}
bootstrap();
```

그리고 http://localhost:3000/docs에 접속하면 swagger 문서를 확인할 수 있다.

<img width="656" alt="스크린샷 2023-10-04 오후 11 17 41" src="https://github.com/nostrss/server-fetchapi/assets/56717167/9abc22e6-7047-426b-95d3-f91aa63c5780">
