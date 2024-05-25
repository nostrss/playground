---
title: Babylon.js를 이용한 3D 페이지 만들어보기
description: 브라우저에서도 3D를 구현할 수 있다는 것을 알고 계셨나요?
date: 2023-10-23
tags: babylonjs 3d nextjs
---

예전에 우연히 정말 `아름답다`고 생각한 `프랑스`의 웹페이지를 본적이 있었다.

<img width="1370" alt="스크린샷 2023-10-24 오전 12 24 24" src="https://github.com/nostrss/next13-blog/assets/56717167/16598ec7-0c16-4b3b-9b8e-41293a6c9f58">

[📌 그림과 배경음악이 아름다운 페이지 📌](https://chartogne-taillet.com/fr)

> 와 이런 페이지는 어떻게 만든걸까? 정말 대단하다.

라는 생각이 절로 들게 했던 웹페이지였다. 그리고 이런 페이지를 만들려면 어떻게 해야할까 라는 생각이 들었었다. `3D`를 이용한 것 같은데, 구체적으로는 어떤 기술을 사용했을지 감이 잘 오지 않았다.

마치 마을하나 전체를 렌더링하고 클릭할 경우 그 마을로 이동하는 효과가 아주 압권이었다.

그런데 위의 웹페이지를 구현할 수 있을 것 같은 기술을 하나 찾은 것 같아 알아 보려고 한다.

바로 `Babylon.js`이다. 요새 `three.js`와 같이 브라우저에서 3D를 구현하는 기술들이 자주 언급이 되고 있는데 그 중에 하나이다.

## Babylon.js란?

[📌 Babylon.js 공식 홈페이지 바로가기 📌](https://www.babylonjs.com/)

`Babylon.js`는 `마이크로소프트`에서 개발했고 `구글팀`도 협력하여 만든 3D 렌더링 엔진이다. 마이크로소프트가 만들었기 때문에 `Typescript`를 지원하는 장점이 있고 그만큼 `신뢰도`가 높다고 생각한다.

하지만 `three.js` 만큼 아직 커뮤니티가 활성화 되어있지는 않아서 인지 검색 시 예제가 많이 부족한 것 같았다.

그리고 자세하게는 모르지만 `webGPU`를 지원하기 때문에 `webGL`보다 더 빠른 렌더링이 가능하다고 한다.

## Babylon.js를 이용한 3D 페이지 만들어보기

Next.js 프로젝트를 생성하고 `Babylon.js`를 설치해 줬다.

[📌 Babylon.js 설치 문서 보기 📌](https://doc.babylonjs.com/setup/frameworkPackages/es6Support#application-creation-summary)

[📌 Babylon.js + React 문서 보기 📌](https://doc.babylonjs.com/communityExtensions/Babylon.js+ExternalLibraries/BabylonJS_and_ReactJS)

그리고 react 관련 공식 문서를 참고하여 렌더링 될 컴포넌트를 아래처럼 생성해주었다.

```tsx
import { useEffect, useRef } from 'react';
import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from '@babylonjs/core';

let box: any;
let sphere: any;

const SceneComponent = ({
  antialias,
  engineOptions,
  adaptToDeviceRatio,
  sceneOptions,
  cameraPosition,
  ...rest
}: any) => {
  // canvas요소를 참조할 ref 생성
  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    // canvas가 없으면 종료
    if (!canvas) return;

    // Babylon.js engine 생성
    const engine = new Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );

    const scene = new Scene(engine, sceneOptions);

    // scene.isReady()가 true이면 onSceneReady() 호출
    if (scene.isReady()) {
      onSceneReady(scene, cameraPosition);
    } else {
      // scene.isReady()가 false이면 scene.onReadyObservable에 onSceneReady()를 추가
      scene.onReadyObservable.addOnce((scene) =>
        onSceneReady(scene, cameraPosition)
      );
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === 'function') onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener('resize', resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener('resize', resize);
      }
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    cameraPosition,
  ]);

  return <canvas style={{ width: '100%' }} ref={reactCanvas} {...rest} />;
};

const onSceneReady = (scene: any, cameraPosition: any) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera('camera1', cameraPosition, scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
  // Move the box upward 1/2 its height
  box.position.y = 0;

  sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);

  sphere.position.x = 4;
  sphere.position.y = 2;

  // Our built-in 'ground' shape.
};

const onRender = (scene: any) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
  }
};

export default SceneComponent;
```

다음에는 아래와 같이 import 해주어 위에서 생성한 컴포넌트를 사용해주었다.
그리고 useState 사용하여 버튼을 클릭하면 3D 환경에서의 `카메라 뷰`의 위치를 변경해도록 수정하였다.

```tsx
import { Vector3 } from '@babylonjs/core';
import SceneComponent from '@/components/SceneComponents';
import { useState } from 'react';
import styled from '@emotion/styled';

export default function Home() {
  const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 3, -5));

  const boxPosition = new Vector3(0, 3, -3);
  const spherePosition = new Vector3(7, 4, 0);

  const moveToBox = () => {
    setCameraPosition(boxPosition);
  };

  const moveToSpehere = () => {
    setCameraPosition(spherePosition);
  };

  return (
    <>
      <main>
        <Button onClick={moveToBox}>Goto Box</Button>
        <Button onClick={moveToSpehere}>Goto Sphere</Button>
        <SceneComponent
          antialias
          id='my-canvas'
          cameraPosition={cameraPosition}
        />
      </main>
    </>
  );
}

const Button = styled.button`
  padding: 5px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;
```

## 결과

[📌 결과보기 📌](https://babylon-sample.vercel.app/)

### 초기화면

<img width="714" alt="스크린샷 2023-10-24 오전 12 59 51" src="https://github.com/nostrss/next13-blog/assets/56717167/6ad20de3-eca1-466a-85e4-db14c4576ee0">

### Box 클릭 시

<img width="714" alt="스크린샷 2023-10-24 오전 1 00 02" src="https://github.com/nostrss/next13-blog/assets/56717167/ffbac887-2545-4f17-9e53-289c01a564e2">

### Sphere 클릭 시

<img width="714" alt="스크린샷 2023-10-24 오전 12 59 58" src="https://github.com/nostrss/next13-blog/assets/56717167/c75c9348-898e-40bf-ac76-eae4d3bbd04d">

처음에 본 웹페이지처럼 아직 아름답지는 않지만 박스와 구가 마을이라고 가정하면 마을을 이동하는 원리는 구현된 것 같은 느낌이다.

> 3D 재밌는데?
