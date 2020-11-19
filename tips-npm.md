## npm publish
**public**
```js
npm publish --access public
```

커스텀 npm 패키지를 만들고 있던 중, 매번 `npm publish` 할 필요없이 로컬에 테스트용 코드를 작성해두면 된다는 것을 알았다.
루트 경로에서 `npx create-react-app demo` 를 하면 `/demo` 폴더 밑에 기본 리액트 프로젝트가 생성된다.

`/demo` 프로젝트에서 상위에 만들어 둔 npm 패키지를 참조할 수 있는데, 다음처럼 사용한다.

```
npm i -S package-name@file:..

ex)

npm i -S my-test-package@file:..
```  

그럼 package.json 파일에 file 경로의 dependency 가 추가된다.
```js
"dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    ...생략...
    "my-test-package": "file:..",
  },
```
