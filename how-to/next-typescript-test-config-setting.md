# Next.js(typescript) + Jest + react testing library

How to set testing environment in Next.js + Typescript

## 1. Install test libraries
```
npm install --save-dev jest babel-jest @testing-library/react @testing-library/jest-dom identity-obj-proxy react-test-renderer @types/react-test-renderer @testing-library/user-event
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

