# How to read environment variables from Node.js

https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs

The process core module of Node.js provides the env property 
which hosts all the environment variables that were set **at the moment the process was started.**

for production, you will probably **be configuring** some bash scripts to export variables.

```bash
USER_ID=239482 USER_KEY=foobar node app.js
```

```js
process.env.USER_ID // "239482"
process.env.USER_KEY // "foobar"
```

If you have multiple environment variables in your node project, 
you can also create an .env file in the root directory of your project, 
and then use the **dotenv package to load them during runtime.**

## dotenv

https://www.npmjs.com/package/dotenv

Dotenv is a zero-dependency module 
that **loads environment variables from a .env file into process.env.** 

Storing configuration in the environment separate from code is based on 
The Twelve-Factor App methodology.

FAQ 

**Should I commit my .env file?**

No. We strongly recommend against committing your .env file to version control.
It should only include environment-specific values such as database passwords or API keys. 
Your production database should have a different password than your development database.

**Should I have multiple .env files?**

No. We strongly recommend against having a "main" .env file and an "environment" .env file like .env.test. 
Your config should vary between deploys, 
and you should not be sharing values between environments.

---

## 정리

node.js 는 **프로세스가 시작될 때** 셋팅되는 env 프로퍼티를 제공하고 `process.env` 구문으로 접근 가능하다.

node 프로젝트에서 env 를 사용하고 싶다면 루트에 .env 파일을 만들고, dotenv package 를 사용하면 된다.

dotenv 는 .env 파일에 있는 변수들을 process.env 로 불러와주는 모듈이다.
