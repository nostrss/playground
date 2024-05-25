# Nostrss's Personal Dev Blog

## About

- `NEXT.js` 13의 `APP Router`를 이용한 개인 블로그입니다.
- 별도의 `백엔드 서버`는 없이, 소스코드 내에 포함된 `Markdown` 파일을 이용하였습니다.
- `NEXT.JS`의 `API Routes`를 이용하여, 블로그에 필요한 API를 구현하였습니다.
- `PC`와 `모바일` 환경에 맞춰 반응형으로 구현하였습니다.
- 별도의 패키지 없이 `무한스크롤`을 직접 구현하였습니다.
- 일부 페이지에 `SSG` 렌더링을 적용하였습니다.
  - 블로그 상세, 태그 검색 결과 페이지
- `다크모드` 기능을 구현하였습니다.(`window.matchMedia`, 쿠키 사용)
- 빌드 시 Feed 파일들이 생성되도록 기능을 구현하였습니다.(`RSS`, `ATOM`, `JSON`)
- 빌드 시 `Sitemap`이 생성되도록 구현하였습니다.
- `metadata`를 생성하여 `Lighthouse`의 SEO 최적화를 진행하였습니다.
- `Storybook`을 이용하여 컴포넌트 문서화 작업을 진행했습니다.

## Tech

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
<img src="https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=Storybook&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>

## Information

URL : `https://nostrss.me`  
Storybook : `https://nostrss.github.io/next13-blog/?path=/docs/example-icons-atom--docs`  
RSS : `https://www.nostrss.me/rss.xml`  
ATOM : `https://www.nostrss.me/rss-atom.xml`  
JSON : `https://www.nostrss.me/feed.json`
SiteMap : `https://www.nostrss.me/sitemap.xml`

## 프로젝트 구조

```
📦src
 ┣ 📂app
 ┃ ┣ 📂api // 블로그 리스트, 상세 페이지, 태그 리스트 API가 구현되어 있습니다.
 ┃ ┣ 📂blog
 ┃ ┃ ┗ 📂[slug]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂tag
 ┃ ┃ ┗ 📂[tag]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜robot.txt
 ┃ ┗ 📜sitemap.ts
 ┣ 📂components
 ┣ 📂constant
 ┣ 📂context
 ┣ 📂hook
 ┣ 📂stories
 ┣ 📂type
 ┣ 📂util
 ┣ 📜defaulMetaData.ts
 ┗ 📜generate-rss.ts
```

## 포스팅하기

- posts 폴더에 마크다운 파일을 추가합니다.
- commit/push
- Vercel > NEXT.JS 빌드 > RSS 빌드 > Vercel 배포완료

## 스토리북 배포 방법

스토리북은 빌드 타임이 길어서 별도로 배포를 하고 있습니다.

터미널에서 아래 명령어를 실행하면 github pages에 배포됩니다.

```bash
yarn deploy-storybook
```
