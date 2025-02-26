# Javascript the core 
http://dmitrysoshnikov.com/ecmascript/javascript-the-core/

## An object

> object 는 프로퍼티의 집합이고, 하나의 prototype object 를 갖고 있다.

- 값은 object 나 null 이 될 수 있다

object 의 prototype 은 `[[prototype]]` 프로퍼티로 연결된다. (유저레벨 코드에선 `_proto_` 프로퍼티로 표현된다.)

## A prototype

> prototype 은 prototype 기반 상속을 구현하는 데 사용되는 위임 객체다.

모든 object 는 생성될 때 prototype 을 받는다. (receive)

- 명시적으로 prototype 이 셋팅되지 않는다면 상속된 object 를 기본 prototype 값으로 받는다.
    - 명시적 → Object.create
    - 암시적 → `__proto__` 프로퍼티

prototype 값에는 object 나 null 이 올 수 있다.

- null 이 아닌 해당 prototype 에 대한 참조가 있으면 프로토타입 체인이라고 한다.

## A prototype chain

> prototype chain 은 상속 및 공유 프로퍼티를 구현하는데 사용되는 유한한 object 체인이다.

룰은 간단한데, 만약 property 나 method 가 object 에 없으면 prototype chain 에서 찾는다.

- prototype 에 없으면 prototype 의 prototype 에서 찾고, 없으면 상위에서 계속 찾는다.
- 이걸 delegation 이라고 하는데, 런타임에서 일어나기 때문에 dynamic dispatch 라고도 불린다.
- 못 찾으면 undefined 가 리턴된다.

Notice, that this value in using an inherited method is set to the original object, but not to the (prototype) object in which the method is found

If a prototype is not specified for an object explicitly, then the default value for __proto__ is taken — Object.prototype. Object Object.prototype itself also has a __proto__, which is the final link of a chain and is set to null.

Notice: ES5 standardized an alternative way for prototype-based inheritance using Object.create function:

ES6 though standardizes the __proto__, and it can be used at initialization of objects.

주의: 객체의 [[Prototype]]을 변경하는 것은 최신 JavaScript 엔진이 속성 접근을 최적화하는 방식의 특성상 모든 브라우저 및 JavaScript 엔진에서 매우 느린 작업입니다. 상속 구조를 변경하는 것이 성능에 미치는 영향은 미묘하고 광범위하며, obj.__proto__ = ... 문에 소요되는 시간 뿐만 아니라 [[Prototype]]이 변경된 객체에 접근할 수 있는 모든 코드들에 대해서도 영향을 줄 수 있습니다. 성능에 관심이 있다면 객체의 [[Prototype]] 설정을 피해야 합니다. 대신 Object.create()를 사용하여 원하는 [[Prototype]]으로 새 객체를 만드세요.
[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/proto](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

Often it is needed to have objects with the same or similar state structure (i.e. the same set of properties), and with different state values. In this case we may use a constructor function which produces objects by specified pattern.

## Constructor

