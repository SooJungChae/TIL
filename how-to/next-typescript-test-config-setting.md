# Next.js(typescript) + Jest + react testing library

How to set testing environment in Next.js + Typescript

## 1. Install test libraries
```
npm install --save-dev jest babel-jest @testing-library/react @testing-library/jest-dom identity-obj-proxy react-test-renderer @types/react-test-renderer @testing-library/user-event
```

## 2. Add `test` command in package.json
```js
// package.json
...

"scripts": {
  ...
  "test": "jest --watch"
}

...
```

## 2. Add `jest.config.js` at root
```js
module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}
```

## 3. Add router mock files at root
```js
// __mocks__/fileMock.js

(module.exports = "test-file-stub")
``` 

```
// __mocks__/styleMock.js

module.exports = {};
```

## 4. Create router util
- https://github.com/vercel/next.js/issues/7479
```js
// src/testUtil.ts

// Mocks useRouter
// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
export function mockNextUseRouter(props: { route: string; pathname: string; query: any; asPath: string }) {
  useRouter.mockImplementationOnce(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
  }));
}
```

## 5. Finish!
```
npm run test
```

---

## Test

```js
// src/components/TestComponent.test.tsx

import React from 'react';
import renderer from 'react-test-renderer';
import TestComponent from './TestComponent';
import { mockNextUseRouter } from '../../../testUtil';

describe('router test', () => {
  mockNextUseRouter({
    route: '/',
    pathname: '',
    query: { couponId: '', tab: TabType.store },
    asPath: '',
  });

  it('render correctly', () => {
    const tree = renderer.create(
      <TestComponent
        onEdit={() => {}}
        onSave={() => {}}
      />,
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
  });
})
```

## TroubleShooting
- **Dependency error**

```
npm WARN old lockfile 
npm WARN old lockfile The package-lock.json file was created with an old version of npm,
npm WARN old lockfile so supplemental metadata must be fetched from the registry.
npm WARN old lockfile 
npm WARN old lockfile This is a one-time fix-up, please be patient...
npm WARN old lockfile 
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: learn-starter@0.1.0
npm ERR! Found: react@17.0.1
npm ERR! node_modules/react
npm ERR!   react@"17.0.1" from the root project
npm ERR!   peer react@"15.x || 16.x || 17.x" from @sentry/nextjs@6.16.1
npm ERR!   node_modules/@sentry/nextjs
npm ERR!     @sentry/nextjs@"^6.14.3" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^17.0.2" from next@11.1.2
npm ERR! node_modules/next
npm ERR!   next@"11.1.2" from the root project
npm ERR!   peer next@"^10.0.8 || ^11.0 || ^12.0" from @sentry/nextjs@6.16.1
npm ERR!   node_modules/@sentry/nextjs
npm ERR!     @sentry/nextjs@"^6.14.3" from the root project
npm ERR! 
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
```

**How to solve**
1. Upgrade react@17.0.1 to react@17.0.2 in package.json becasue of this paragraph
```
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^17.0.2" from next@11.1.2
```

2. `npm install`
3. Install test libraries again.



## Todos
- [ ] npm test -- --coverage


