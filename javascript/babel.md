# About babel
ES2015+ js 코드들을 이전버전의 javascript 로 변환해주는 컴파일러

## 동작방식

- babel : 컴파일 타임에 동작
- babel-polyfill : 런타임에 동작. code 조각으로, 런타임에 존재하지 않는 native API 의 복사본을 말한다.
> 처음 시작될 때 브라우저에서 지원하지 않는 함수를 검사해서 지원하지 않으면<br/>
> Object 의 prototype 에 붙여주는 역할을 한다.

## .babelrc
- plugins 와 presets 속성이 제일 중요
- plugins 는 각 문법을 하나의 plugin 이라 한다.
- presets 은 plugin 여러개가 묶인 개념이다. (es2015 presets, react presets 가 주로 사용된다.)
- presets 에 사용될 preset 을 추가하고, 추가 사용하고 싶은 plugin 은 plugins 에 추가한다.

## Refs
- [ECMAScript 6를 위한 Babel 기본 사용법](https://www.haruair.com/blog/2917)
