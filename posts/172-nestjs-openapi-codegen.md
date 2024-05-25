---
title: 서버(Nest.js)와 Front(Next)가 Type을 공유하는 방법(openapi-tools).
description: 이제 Front에서 type을 서버에서 다운받아 사용하자.
date: 2023-10-04
tags: nestjs openapi codegen type
---

Front에서 작업을 하다보면 Type을 지정하는 일이 제법 손이 많이 간다.

특히 data의 내용이 큰 경우에는 더더욱 그렇다.

그러다가 예전에 `codegen`을 사용했던 기억이 났다. 그때는 `graphql`을 사용했었고, 서버에서 `type`을 받아 프론트에서 생성해서 사용할 수 있었다.

`rest api`에서도 사용할 수 있지 않을까 해서 찾아보았다.

## Nest.js Server

먼저 Nest.js에 `nestjs-openapi-tools`를 설치해주자.

[📌 nest-openapi-tools npm 페이지 바로가기 📌](https://www.npmjs.com/package/nest-openapi-tools/v/4.0.0)

그리고 `main.ts`에 아래와 같이 추가해주자.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exceptions/http.exceoptions';
import { OpenApiNestFactory } from 'nest-openapi-tools';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  await OpenApiNestFactory.configure(
    app,
    new DocumentBuilder()
      .setTitle('My API')
      .setDescription('An API to do awesome things')
      .addBearerAuth(),
    {
      webServerOptions: {
        enabled: true,
        path: 'api-docs',
      },
      fileGeneratorOptions: {
        enabled: true,
        outputFilePath: './openapi.yaml',
      },
      clientGeneratorOptions: {
        enabled: true,
        type: 'typescript-axios',
        outputFolderPath: '../typescript-api-client/src',
        additionalProperties:
          'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
        openApiFilePath: './openapi.yaml',
        skipValidation: true,
      },
    },
    {
      operationIdFactory: (c: string, method: string) => method,
    }
  );

  await app.listen(3000);
}
bootstrap();
```

그리고 nest 서버를 실행시켜보자.

```bash
yarn start:dev
```

그러면 `openapi.yaml`과 `openapitools.json` 파일이 생성된 것을 확인할 수 있다.

<img width="307" alt="스크린샷 2023-10-07 오전 12 19 38" src="https://github.com/nostrss/next13-blog/assets/56717167/49408bfb-b60b-42e5-8b66-f1cbcac02912">

이렇게 하면 서버측 준비는 끝나게 된다.

## Front-end(Next.js)

이제 front에서 `openapi.yaml`을 받아서 사용해보자.

나는 Next.js 프로젝트를 생성해서 사용했다.

그리고 `@openapitools/openapi-generator-cli` 패키지를 설치해주자.

[📌 @openapitools/openapi-generator-cli npm 페이지 바로가기 📌](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)

```bash
yarn add @openapitools/openapi-generator-cli
```

그리고 package.json에 아래와 같이 추가해주자.

> openapi.yaml 파일을 서버에 올리지 않고 테스트만 하는 거라, nest.js에서 생성된 openapi.yaml 파일을 복사해서 프론트 프로젝트의 루트에 붙여넣었다.

```json
{
  "scripts": {
    "codegen": "npx @openapitools/openapi-generator-cli generate -i openapi.yaml -g typescript-axios --additional-properties apiPackage=apis,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true --global-property models -o ./src/openapi --skip-validate-spec "
  }
}
```

그리고 `yarn codegen`을 실행시켜주자.

그러면 터미널에서 아래와 같이 실행이 되는 것을 확인할 수 있다.

<img width="885" alt="스크린샷 2023-10-07 오전 12 26 50" src="https://github.com/nostrss/next13-blog/assets/56717167/72ae97a0-f49d-47a9-81b7-86d1da50f17d">

완료가 되면 `src/openapi` 폴더가 생성되고 그 안에 `models` 폴더가 생성된 것을 확인할 수 있다.

그리고 여러 `ts` 파일들이 생성된 것을 확인할 수 있는데, 파일의 내용을 살펴보면 `nest.js` 서버에서 작성한 `openapi.yaml` 파일을 기반으로 `type`들이 생성되어 있는 것을 확인할 수 있다.

<img width="885" alt="스크린샷 2023-10-07 오전 12 29 15" src="https://github.com/nostrss/next13-blog/assets/56717167/c6daaf12-bd4f-4e3e-b53e-3ae0efb660b8">

이제 프론트에서는 이렇게 생성된 `type`들을 사용하여 개발을 하면 된다!
