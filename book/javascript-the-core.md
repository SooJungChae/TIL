# Javascript the core 
http://dmitrysoshnikov.com/ecmascript/javascript-the-core/

## An object

> An object is a collection of properties and has a single prototype object. 
The prototype may be either an object or the null value.

A prototype of an object is referenced by the internal [[Prototype]] property

What for these prototypes are needed? Let’s consider a prototype chain concept

## A prototype chain

If a prototype has a non-null reference to its prototype, and so on, this is called the prototype chain.

> A prototype chain is a finite chain of objects which is used to implement inheritance and shared properties.

ECMAScript has no concept of a class. 
However, a code reuse stylistics does not differ much and achieved via the prototype chain. 

This kind of inheritance is called a delegation based inheritance 
(or, closer to ECMAScript, a prototype based inheritance)

The rule is simple: if a property or a method is not found in the object itself (i.e. the object has no such an own property), then there is an attempt to find this property/method in the prototype chain. 
If the property is not found in the prototype, then a prototype of the prototype is considered, and so on, i.e. the whole prototype chain

Thus, a found property is called inherited property. If the property is not found after the whole prototype chain lookup, then undefined value is returned.

Notice, that this value in using an inherited method is set to the original object, but not to the (prototype) object in which the method is found

If a prototype is not specified for an object explicitly, then the default value for __proto__ is taken — Object.prototype. Object Object.prototype itself also has a __proto__, which is the final link of a chain and is set to null.

Notice: ES5 standardized an alternative way for prototype-based inheritance using Object.create function:

ES6 though standardizes the __proto__, and it can be used at initialization of objects.

주의: 객체의 [[Prototype]]을 변경하는 것은 최신 JavaScript 엔진이 속성 접근을 최적화하는 방식의 특성상 모든 브라우저 및 JavaScript 엔진에서 매우 느린 작업입니다. 상속 구조를 변경하는 것이 성능에 미치는 영향은 미묘하고 광범위하며, obj.__proto__ = ... 문에 소요되는 시간 뿐만 아니라 [[Prototype]]이 변경된 객체에 접근할 수 있는 모든 코드들에 대해서도 영향을 줄 수 있습니다. 성능에 관심이 있다면 객체의 [[Prototype]] 설정을 피해야 합니다. 대신 Object.create()를 사용하여 원하는 [[Prototype]]으로 새 객체를 만드세요.
[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/proto](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

Often it is needed to have objects with the same or similar state structure (i.e. the same set of properties), and with different state values. In this case we may use a constructor function which produces objects by specified pattern.

## Constructor

