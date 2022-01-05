# Typescript 로 블록체인 만들기

## 1. yarn 프로젝트 생성 `yarn init`

## 2. typescript 설치 `yarn add typescript`

## 3. index file 생성

index.js
```js
console.log('hello');
```

## 4. typescript config 설정
tsconfig.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015",
    "sourceMap": true
  },
  "include": ["index.ts"],
  "exclude": ["node_modules"]
}
```

## 5. typescript 실행 테스트 `tsc`
index.ts 파일 밑에 index.js, index.js.map 생기는 것을 확인한다.

## 6. 프로젝트 실행 코드 생성
start 를 하면 코드를 자동 컴파일 해주도록 만든다.

package.json
```json
{
  ...
  "scripts": {
    "prestart": "tsc",
    "start": "node index.js"
  }
}
```` 

typescript 파일을 컴파일 한 후 index 파일을 만들어 node 로 실행한다.

## 7. 파일들 관리하기 편하게 폴더로 만든다.

tsconfig.json
```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2015",
    "outDir": "dist",
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

- src: ts 파일들을 넣는다.
- dist: .js 로 변환된 파일들이 이 디렉토리로 출력된다.

## 8. 핫로딩(실시간 변환) + start 명령어를 간단하게 만든다. `yarn add tsc-watch --dev` 

package.json
```json
{
  ...
  "scripts": {
    "start": "tsc-watch --onSuccess \" node dist/index.js \"",
  }
}
````

- [Typescript로 블록체인 만들기- #1 Introduction and What are we building](https://www.youtube.com/watch?v=7wAhwv2Rbxw)
- [Typescript로 블록체인 만들기- #2 Setting Typescript Up](https://www.youtube.com/watch?v=-dyrcJr5NiQ)
- [Typescript로 블록체인 만들기- #3 First steps with Typescript](https://www.youtube.com/watch?v=l-rpsjE13KI)
- [Typescript로 블록체인 만들기- #4 Types in Typescript](https://www.youtube.com/watch?v=uEicpgp13tI)
