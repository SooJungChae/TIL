서버에서배포하는시간
프로젝트가 커질수록 빌드 시간이 커져갔다.
빌드에러가 발생하진 않았는데 규모가 커질수록 빌드하는 시간이 길어져 빌드에러가 발생했다.

시간을 넘어섬.

빌드시간을 쪼개는 것.

커질수록 앱이 점점 느려지는 문제
bundle 사이즈를 줄여야 한다.

routing 을 통해서 자연적으로 줄여지긴 하지만
컴포넌트 구조를 변경한다면 더 줄일 수 있다.

## 테스트 해보자
`npm run build`빌드를 실행해보면 만들어지는 파일들을 볼 수 있고, 각 파일이 빌드하는데 어느정도 걸리는 지 아 수 있다.

[GTmetrix](https://gtmetrix.com/) 라는 곳에서 사이트 속도 테스트를 해봤다.
309KB 를 로드하는데 3.9s 가 걸렸다. (아....)

next 에서 First load js 는 서버에서 페이지에 접속해 다운로드받는 파일 사이즈를 말한다. 이 모든 JS 가 분리되어서 사용되게 된다. 
first load 는 녹색, 노란색, 빨간색으로 표시되는데 녹색일 수록 좋은 어플리케이션이라는 의미이다.


<img width="529" alt="스크린샷 2021-09-25 오후 3 21 49" src="https://user-images.githubusercontent.com/12723983/134761078-203963b4-f504-4520-9991-6f9698a28062.png">
저런...

## First Load JS 크기를 줄여보자

로드를 줄이는 방법으로는 다음이 있다.

1. Code splitting 
2. First Contentful Paing - React.lazy

가장 좋은방법은 `import()` syntax 를 사용하는 것이다. 
Webpack 이 이 구문을 만나면 자동적으로 code-splitting 을 진행한다.
코드를 필요할 때 동시적으로 로드할 수 있는 번들로 관리할 수 있는 가능한 chunck 로 나눠서 관리한다.

컴포넌트도 dynamic 로딩이 가능하다.

## React.lazy 랑 dynamic 로딩의 차이
서버사이드 렌더링에서는 지원안한다.
서버사이드 렌더링되는 앱에서 code-splitting 을 하고 싶다면 `Loadable Components` 를 추천한다.


## 참고
[Nilanth, How to Reduce React App Loading Time By 70%](https://javascript.plainenglish.io/speed-up-your-react-app-initial-load-using-code-splitting-f2de58c01ed2)
[React, Code-Splitting](https://reactjs.org/docs/code-splitting.html#code-splitting)
[webpack, code splitting](https://webpack.js.org/guides/code-splitting/)
