## npm publish
1. 배포하기 전에 npm 에 로그인 한다.
```
npm login
```

2. **public** publish
```js
npm publish --access public
```

해당 패키지가 프로젝트에 install 되어 있다면 `update` 나 `upgrade` 로 쉽게 새로운 버전으로 인스톨 할 수 있다.
`package.json` 에서 버전 앞에 `^`기호를 넣어주면 된다.

**package.json**
```js
"dependencies": {
    "@naanace/my-test-package": "^1.0.7"
    ...
}
```
**cli**
```js
npm update @naanace/my-test-package
```  
`^`기호를 붙임으로써 `1.1.0`버전 이전까지는 업그레이드 된다. `^2.0.0` 이라면 `(>=2.0.0 <3.0.0)`
 
### Test project before publish

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
