# 리액트 컴포넌트에서 `<script>` 파일 추가하기

1. `react-script-tag` / `React Helmet` 패키지 사용하기

쉽지만 패키지를 설치해야한다는 점이 아쉽다

2. DOM method 로 script 추가

javascript 로 script 를 추가하는 방법은 다음과 같다. 
```js
const script = documet.createElement("script");
script.src = scriptUrl;
script.async = true;
documet.body.appendChild(script);
```

여러 컴포넌트에서 script 를 추가하는 로직이 필요하다면 공통 함수로 만들면 된다.
```js
// utils/appendScript.js
export const appendScript = (scriptUrl) => {
  const script = documet.createElement("script");
  script.src = scriptUrl;
  script.async = true;
  documet.body.appendChild(script);
}
```

React 는 `custom Hook` 을 지원한다. 컴포넌트를 만드는 로직으로 재사용가능한 함수를 만드는 개념이다.
useEffect hook 에 집어넣어서 리렌더링과 컴포넌트가 해제될 때 script 도 지워줄 것이다.
```js
// customHooks/importScript.js
import React from 'react';

const importScript = scriptUrl => {
  useEffect(() => {
    const script = documet.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    documet.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [scriptUrl]);
};

export default importScript;
```
```js
// someComponent.js
import { importScript } from 'customHooks/importScript'

const someComponent = () => {
  importScript('path/to/resource.js');
}
``` 

## 출처
[4 Ways to Add External JavaScript Files in React - Nivedha Duraisamy
](https://medium.com/better-programming/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668)
