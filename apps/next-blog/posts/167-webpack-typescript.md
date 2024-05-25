---
title: 리액트를 벗어나 순수한 프로젝트를 만들어보자
description: 바닐라 타입스크립트에 웹팩을 설정한 템플릿 만들기
date: 2023-09-19
tags: javascript typescript webpack
---

처음 프론트엔드를 배울때 React로 배우고 계속 사용하다보니 리액트 없이는 프론트엔드를 할 수 없는 느낌이 들었다. 그래서 리액트를 벗어나 순수한 프로젝트를 만들어보고 싶었다. 바닐라 자바스크립트에 타입스크립트만 추가한 템플릿을 만들어보았다.

[📌 깃허브에서 소스코드 보기 📌](https://github.com/nostrss/webpack-template)

## npm init

먼저 폴더를 생성하고 `npm init`을 실행해준다.

몇가지 질문이 진행되고 완료되면 `package.json`이 생성되게 된다.

<img width="787" alt="스크린샷 2023-09-19 오후 10 13 05" src="https://github.com/nostrss/next13-blog/assets/56717167/aa86c89c-7ba3-4ac4-888f-097a49791511">

## 테스트를 위한 파일 생성

```
📦src
 ┣ 📜about.html
 ┣ 📜about.js
 ┣ 📜index.html
 ┣ 📜index.ts
 ┣ 📜style.css
 ┗ 📜word.js
```

웹팩을 설치하고 빌드하기 전에 테스트를 위한 파일들을 위와 같이 생성해주었다.

## 웹팩 설치(v5)

[📌 웹팩 공식문서 바로가기 📌](https://webpack.kr/guides/getting-started/#creating-a-bundle)

```bash
npm install webpack webpack-cli --save-dev
```

## webpack.config.js 기본 설정하기

```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: { index: '/src/index.ts', about: '/src/about.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};
```

### mode

[📌 웹팩 Mode 문서 바로가기 📌](https://webpack.kr/configuration/mode/#root)

mode의 경우 Default로는 production으로 설정되어 있다.

production 모드의 경우 최적화가 되어 빌드가 되며, 이로 인해 빌드파일의 크기가 development 모드에 비해 작아진다.

production과 development의 빌드 결과는 아래와 같은 차이가 있다.

> development 인 경우

사람이 조금은 알아볼 수 있는 형태로 빌드가 된다.

<img width="811" alt="스크린샷 2023-09-20 오후 12 40 19" src="https://github.com/nostrss/next13-blog/assets/56717167/ba2f6061-f6b1-4ecb-9575-d50aa78ba535">

- production 인 경우

<img width="811" alt="스크린샷 2023-09-20 오후 12 39 48" src="https://github.com/nostrss/next13-blog/assets/56717167/74d5a477-df8b-49d3-8771-43ab09780fd0">

사람이 알아볼 수 없을 정도로 최적화가 되어 빌드가 된다.

### Entry Points

[📌 웹팩 Entry Points 문서 바로가기 📌](https://webpack.kr/concepts/entry-points/#root)

webpack이 빌드할 파일을 지정해주는 부분이다.

테스트로 파일을 2개 생성했기 때문에 2개의 파일을 지정해주었다.

### Output

[📌 웹팩 Output 문서 바로가기 📌](https://webpack.kr/concepts/output/)

빌드된 파일을 어디에 어떻게 저장할지 지정해주는 부분이다.

`path`는 빌드된 파일을 저장할 경로를 지정해주고, `filename`은 빌드된 파일의 이름을 지정해준다.

`filename`의 경우 `[name]`을 사용하면 `entry`에 지정한 Key값(index, about)을 파일명으로 빌드하게 된다.

다만 이렇게 빌드하여 배포가 될 경우, 빌드 결과 파일의 이름이 기존과 동일하기 브라우저 캐쉬로 인해 변경사항이 유저에게 전달되지 않았던 경험이 있다.

그래서 아래와 같이 다시 수정해서 빌드를 해봤다.

```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: { index: '/src/index.ts', about: '/src/about.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
};
```

<img width="367" alt="스크린샷 2023-09-20 오후 12 46 14" src="https://github.com/nostrss/next13-blog/assets/56717167/7929ce5f-51f3-44ea-a480-ed327f9b0f4b">

빌드할 때 마다 `hash` 값이 계속 달라지게 되고 브라우저에서는 이전과 파일명이 다르기 때문에 캐쉬를 사용하지 않고 새로 빌드된 파일을 사용하게 된다.

## 문제점

js파일은 빌드가 되는 것은 확인이 되었다.

그리고 js파일을 html과 연결 후 브라우저를 통해 확인해보니 정상적으로 보인다.

하지만 몇가지 문제점이 보였다.

1. CSS 파일이 별도로 로딩이 되고 있었다.
   <img width="472" alt="스크린샷 2023-09-20 오후 12 51 05" src="https://github.com/nostrss/next13-blog/assets/56717167/55c0079e-5e50-4e44-929d-d2151a276479">

2. js파일을 html에 연결해야하는 번거로움이 있다.

- 현업에서 만약 이렇게 사용하면 빌드 후 배포할때, 빌드 할때마다 HTML파일에 새로 생성된 js파일을 HTML에 연결해주는 번거로움이 존재한다.

하나씩 해결해보자.

## Loader를 사용하여 CSS를 JS파일과 함께 빌드하고 DOM에 반영하기

[📌 웹팩 로더 문서 바로가기 📌](https://webpack.kr/concepts/loaders/)

이를 위해 2개의 패키지를 추가로 설치해주자.

```bash
npm install css-loader style-loader -D
```

그리고 `webpack.config.js`를 아래와 같이 수정했다.

```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: { index: '/src/index.js', about: '/src/about.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // injects the css into the DOM
          { loader: 'style-loader' },
          // translates CSS into JS
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
};
```

그리고 다시 빌드 후 HTML 파일에 link css를 삭제하고 빌드 파일을 연결해 주었다.

<img width="472" alt="스크린샷 2023-09-20 오후 1 02 56" src="https://github.com/nostrss/next13-blog/assets/56717167/c534d425-819c-4084-a349-c13e667df618">

결과물도 정상적으로 나오고 이제는 css 파일을 별도로 로딩하지 않는 것을 확인할 수 있었다.

## Plugins를 이용해 html 파일 생성하기

[📌 웹팩 HtmlWebpackPlugin 문서 바로가기 📌](https://webpack.kr/plugins/html-webpack-plugin/)

현재 js파일에 css를 추가하여 빌드하는 것까지는 성공했다.

이제 빌드시 html파일을 생성하고 여기에 js파일을 자동으로 연결해주는 작업을 해보자. 이를 위해 아래의 패키지를 설치해 주자.

```bash
npm install -D html-webpack-plugin
```

그리고 webpack.config.js를 아래와 같이 수정해주자.

```js
const path = require('path');
// ----> 추가
const HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: { index: '/src/index.js', about: '/src/about.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // injects the css into the DOM
          { loader: 'style-loader' },
          // translates CSS into JS
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  // ----> 추가
  plugins: [
    new HtmlWepackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index'],
    }),
    new HtmlWepackPlugin({
      template: './src/about.html',
      filename: './about.html',
      chunks: ['about'],
    }),
  ],
};
```

그리고 html파일에서 js파일을 추가해주는 script를 삭제해주자.

> 즉 이제 html파일에 css와 js파일을 link, script로 삽입해주지 않아도 된다.

이제 빌드를 해보자.

<img width="345" alt="스크린샷 2023-09-20 오후 1 11 43" src="https://github.com/nostrss/next13-blog/assets/56717167/6e3052ba-8491-44ba-be8b-ca4574797010">

dist 폴더 안에 html파일이 함께 생성된 것을 볼 수 있다.

## Typescript 설정하기

[📌 웹팩 Typescript 문서 바로가기 📌](https://webpack.kr/guides/typescript/)

나는 타입스크립트를 사용할 것이기 때문에 또 추가적인 설정이 필요하다.

일단 나는 타입스크립트가 글로벌로 설치가 되어 있기 때문에 아래의 패키지만 설치를 해주었다.

```bash
npm install -D ts-loader
```

설치 후에는 tsconfig.json 파일을 아래와 같이 생성해주었다.

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```

타입스크립트 파일이 빌드가 되는지 테스트를 위해 indext.js파일의 확장자를 indext.ts로 변경해주었다.

그리고 webpack.config.js를 아래와 같이 수정해주었다.

```js
const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  // ----> ts 파일로 수정
  entry: { index: '/src/index.ts', about: '/src/about.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // injects the css into the DOM
          { loader: 'style-loader' },
          // translates CSS into JS
          {
            loader: 'css-loader',
          },
        ],
      },
      // ----> 추가
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // ----> 추가
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWepackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index'],
    }),
    new HtmlWepackPlugin({
      template: './src/about.html',
      filename: './about.html',
      chunks: ['about'],
    }),
  ],
};
```

빌드를 해보니 이전과 동일하게 정상적으로 빌드가 성공하는 것을 확인할 수 있었다.

## 빌드시 이전 결과물 삭제하기

이제 기본적인 설정은 끝난 것 같다.

그러나 빌드할 때마다 hash값이 변하다 보니 빌드 결과물에 이전 js파일들이 남아 있는 것을 확인할 수 있었다.

<img width="345" alt="스크린샷 2023-09-20 오후 1 28 55" src="https://github.com/nostrss/next13-blog/assets/56717167/e782df27-d869-4b07-8797-339366faed42">

이건 추가 설정으로 간단히 해결 할 수 있었다.

```js
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    // ----> 추가
    clean: true,
  },
```

위와 같이 clean 옵션을 추가해주면 빌드시 이전 결과물을 삭제해준다.

이렇게 만들고 나니 기존의 react가 얼마나 편한 라이브러리인지 체감하게 됐다.

위의 설정등을 하지 않고 바로 최적화 빌드가 가능한 지금, 과거 프론트엔드 개발자들은 얼마나 힘들게 개발을 했을까 싶다.
