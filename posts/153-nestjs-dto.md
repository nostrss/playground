---
title: [Nest] DTO, 그게 뭐야? 왜쓰는데? 어떻게 쓰는데?
description : 이름도 생소한 DTO, 그것이 알고 싶다.
date: 2023-09-01
tags: nestjs dto validator transformer
---

## DTO(Data Transfer Object)란?

nest.js를 공부하면서 생소한 용어들이 있었는데, 그중 하나가 바로 DTO(Data Transfer Object)였다.

> 데이터 전송 객체(data transfer object, DTO)는 프로세스 간에 데이터를 전달하는 객체이다. 프로세스 간 통신이 일반적으로 원격 인터페이스(예: 웹 서비스)로 재정렬하면서 이루어지게 되는데 여기에서 각 호출의 비용이 많다는 점을 동기로 하여 이용하게 된다. 각 호출의 비용이 큰 것이 클라이언트와 서버 간 왕복 시간과 관련되기 때문에 호출의 수를 줄이기 위해 여러 호출에 의해 전송되는 데이터를 축적하면서 오직 하나의 호출만으로 서비스되는 객체인 DTO를 사용하는 것이다.

> [🔗 위키피디아 바로가기 🔗](https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%A0%84%EC%86%A1_%EA%B0%9D%EC%B2%B4)

즉, 클라이언트, 서버, 데이터베이스 간에 통신하기 전에 `유효성` 검사를 하고, `데이터`를 변환하는 역할을 하는 것 같다.

프론트 개발자 입장에서 이해를 해보면 `interface`로 `타입`만 지정해주는 것이 아니라, 요청을 보내거나 받을 때 `interface`로 지정된 타입으로 `형변환`까지 해주는 역할을 한다고 생각하면 될 것 같다.

## DTO를 사용하는 이유

> [🔗 관련글 바로가기 🔗](https://dev.to/bivor/why-dtos-are-a-must-have-in-nestjs-api-development-3j2j)

위 링크의 글을 읽어보니 DTO를 사용하는 이유는 아래와 같다.

> - DTO는 클라이언트와 서버 간의 문제를 명확하게 분리할 수 있다.
> - API의 복잡성을 줄이고 유지 관리를 더 쉽게 만드는 데 도움이 될 수 있다.

리액트에서 타입스크립트를 사용하는 것과 비슷한 이유라고 생각하면 될 것 같다.

좀 더 안정적이고, 통신간에 타입으로 인한 오류를 사전에 방지할 수 있는 장점이 있기 때문에 사용하는 것으로 보인다.

## DTO 예시

```ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBoardDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '작성자 아이디',
    required: true,
    example: '1',
  })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '내용',
    required: true,
    example: '안녕하세요',
  })
  content: string;
}
```

위의 코드에서 `CreateBoardDto`는 `userId`와 `content`라는 두개의 속성을 가지고 있는데, 위 코드를 React 코드로 표현하면 아래와 비슷할 것 같다.

```ts
interface ICreateBoardDto {
  userId: number;
  content: string;
}

export default function CreateBoardDto(dto: ICreateBoardDto) {
  return {
    userId: Number(dto.userId),
    content: String(dto.content),
  };
}
```

그리고 Service 코드에서는 위에 지정한 DTO의 형식으로 데이터를 가져 올수 있게 된다.

```ts
async create(data: CreateBoardDto) {
    return this.boardRepository.save(data);
  }
```

## class-validator와 class-transformer

위의 역할을 하기 위해서는 추가적인 npm 패키지가 필요하다.

찾아보니 아래 2개의 패키지를 많이 사용하는 것 같다.

> [🔗 npm class-validator 바로가기 🔗](https://www.npmjs.com/package/class-validator)

> [🔗 npm class-transformer 바로가기 🔗](https://www.npmjs.com/package/class-transformer)

`class-validator`는 `DTO`의 유효성 검사를 해주고, `class-transformer`는 `DTO`의 형변환을 해주는 역할을 한다.

위의 패키지를 설치하고, `main.ts`에 아래와 같이 ValidationPipe를 설정해주면 DTO에서 지정한 유효성 검사와 형변환을 자동으로 해준다.

```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);

  // ValidationPipe 전역 적용
  app.useGlobalPipes(
    new ValidationPipe({
      // class-transformer 적용
      transform: true,
    })
  );

  await app.listen(port);
  console.info(`listening on port ${port}`);
}
bootstrap();
```
