# Next.js 에서 development, staging, production 환경 만들기

Next.js 는 `development`, `production` 단계만 지원한다.

사내 프로젝트에서는 `production` 단계 이전에 QA 를 위한 `staging` 단계가 존재하기 때문에 이 단계를 설정하는게 필요했다.

package.json
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start:staging": "NODE_ENV=staging next start",
    "start:production": "NODE_ENV=production next start"
  }
```
현재 이렇게 구성되어 있고, 각 환경에 맞게 다음 코드를 실행하게 된다.

----

**development**
npm run dev

**staging**
npm run build
npm run start:staging

**production**
npm run build
npm run start:production

----

`development` 는 페이지 접근을 될 때마다 새롭게 화면을 rebuild 되는데  
`production` 환경인 경우 build 때 이미 배포용 파일을 만들어 두기 때문에 rebuild 작업을 하지 않는다.

그러나 staging 단계를 만날 경우 
next.js 는 `development`, `production` 만 체크하다 보니  
현재 NODE_ENV 가 "배포 환경이 아니구나" 라는 것만 감지한다. 

이렇게 되면 자동적으로 `development` 환경이라고 생각하게 되고 `staging` 환경이지만 매번 rebuild 된다. 

> Next.js 의 "run command" 는 development, production 두가지 환경만 지원한다!

## 해결방법

**NODE_ENV** 는 `production` 으로 만들어서 rebuild 를 방지하고
새로운 변수인 ENV 를 추가해서 환경을 분리하면 된다.

위에서 봤던 package.json 코드를 수정해보자.  

package.json
```json
  "scripts": {
    "dev": "next dev",
    "build:staging": "ENV=staging next build",
    "build:production": "ENV=production next build",
    "start:staging": "NODE_ENV=production ENV=staging next start",
    "start:production": "NODE_ENV=production ENV=production next start"
  }
```

포인트는 Next.js 가 해석하는 **NODE_ENV** 변수를 `production` 으로 변경하고
ENV 라는 변수를 따로 만들어 프로젝트를 구분하고 있다는 것이다.

env_config.js
```js
const env = process.env.ENV || 'development'; 
// const type = process.env.TYPE || EnvType.chak;
const type = 'homepage';

// (...생략)

const configs = {
  development: {
    ...kakaoConfigs,
    ...devConfigs,
    host: `//local-${type}.soo.com:3000`,
  },
  staging: {
    ...kakaoConfigs,
    ...stagingConfigs,
    host: `//test-${type}.soo.com`,
  },
  production: {
    ...kakaoConfigs,
    ...prodConfigs,
    host: `//${type}.soo.com`,
  },
}[env];

module.exports = configs;
```

프로젝트를 staging 으로 실행하고 싶다면 다음 코드를 사용하면 된다. 
```
npm run build:staging
npm run start:staging
```

위의 예시에서처럼 type 을 추가로 변수로 만들어 사용하고 싶다면 인자를 추가로 전달해주면 된다.
```
TYPE='homepage' npm run build:staging
TYPE='homepage' npm run start:staging
```



- https://medium.com/@dzungnguyen179/nextjs-multiple-environment-builds-e8b2ccb11c04
 

---

[node 프로젝트에서는 dotenv 패키지를 사용해서 .env 파일에 있는 변수들을 process.env 로 불러와야 하는데](../what-is/javascript/environment-variable.md) 
next.js 에서는 .env 파일만 선언하면 자동으로 처리해준다.

env 파일은 node 환경에서 사용가능하기 때문에, 
production 빌드용으로 static 파일을 expose 한 경우에는
`NEXT_PUBLIC_` prefix 를 사용해서 브라우저에서도 사용할 수 있도록 만들어줘야 한다.

> Note: In order to keep server-only secrets safe, 
> Next.js **replaces process.env.* with the correct values at build time.** 
> This means that process.env is not a standard JavaScript object, 
> so you’re not able to use object destructuring. 
> Environment variables must be referenced as 
> e.g. process.env.PUBLISHABLE_KEY, not const { PUBLISHABLE_KEY } = process.env.

**Exposing Environment Variables to the Browser**

By default environment variables are only available in the Node.js environment, 
meaning they won't be exposed to the browser.

In order to expose a variable to the browser you have to prefix the variable with `NEXT_PUBLIC_`

```js
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

This loads process.env.NEXT_PUBLIC_ANALYTICS_ID into the Node.js environment automatically, 
allowing you to use it anywhere in your code. 
The value will be inlined into JavaScript sent to the browser 
because of the NEXT_PUBLIC_ prefix. 
This **inlining occurs at build time**, so your various NEXT_PUBLIC_ envs 
need to be set when the project is built.


https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables
