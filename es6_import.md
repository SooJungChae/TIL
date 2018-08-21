javascript 는 원래 모듈 관리 방식이 없었다. `<script>`태그를 지정해 스크립트를 전체 import 하는 방식을 취했었는데, 이는 모두 `window` 객체의 속성이 되어 모듈의 의존성 관리가 쉽지 않는다는 문제가 있었다. 

그래서 `CommonJS` 와 `AMD` 모듈 관리 방식이 나오게 되었고, ES6 에서는 이 둘을 기본적으로 지원해주게 되었다. 이 중에서 내가 자주 봤던 `CommonJS` 코드와 ES6 코드를 비교해보며 import, export 를 정리해보고자 한다.

```javascript
// ES6 
var moduleA = {};
export default moduleA;
...
import A from 'es6Test.js';
```

```javascript
// CommonJS
function moduleB() { };
module.exports = moduleB;
// 또는 exports = moduleB;
...
var B = require('CommonJSB.js');
```

ES6 에서는 import, export 를 쓰고 있고, CommonJS 에서는 module.exports / exports 와 require 를 사용하고 있다. 서로서로 혼용해서 쓸 수 있지만 통일성을 지켜주는 걸 선호한다.

# import
```javascript
import React from 'react';
import {render} from 'react-dom';
```
- 괄호 쓰는 차이는 export 방식의 차이.

```javascript
export {a}
export const c;
export default b;
```
- default 를 쓰면 괄호 사용할 필요 없다. 변수명 아무거나 사용 가능
- 이외에는 괄호 사용이 필수. 변수명 변경하고 싶으면 as 로 사용한다. `import { a as abc } from 'Test.js';`
- 모듈 시스템은 아직 모든 브라우저가 지원해주는게 아니니, Babel 을 사용해서 ES5 로 만드는 작업이 필요하다.

# exports vs module.exports
- 둘다 {} empty object 를 가리킨다.
- 변수를 exports 할 때 는 같지만, 함수를 export 할 때 주의해야 한다.
- exports.doSomething 으로만 사용하면 module 은 여전히 {} 를 가리킨다.
- 즉, 함수를 export 시키고 싶다면 `module.exports` 를 사용해야 한다.

# Refs
- [import 할 때 괄호를 쓰고 안쓰고의 차이](https://www.zerocho.com/category/ECMAScript/post/579dca4054bae71500727ab9)
- [exports vs module.exports](https://blog.tableflip.io/the-difference-between-module-exports-and-exports/)
- [[javascript] require vs import (CommonJs와 ES6)](https://blueshw.github.io/2017/05/16/ES-require-vs-import/)

