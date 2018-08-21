# import
[https://www.zerocho.com/category/ECMAScript/post/579dca4054bae71500727ab9](https://www.zerocho.com/category/ECMAScript/post/579dca4054bae71500727ab9)

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
[https://blog.tableflip.io/the-difference-between-module-exports-and-exports/](https://blog.tableflip.io/the-difference-between-module-exports-and-exports/)
- 둘다 {} empty object 를 가리킨다.
- 변수를 exports 할 때 는 같지만, 함수를 export 할 때 주의해야 한다.
- exports.doSomething 으로만 사용하면 module 은 여전히 {} 를 가리킨다.
- 즉, 함수를 export 시키고 싶다면 `module.exports` 를 사용해야 한다.
