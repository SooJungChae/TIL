반갑습니다~
**유지보수가 쉬운 코드**를 작성하기 위해 공부하는 페이지입니다.

# 자바스크립트 디자인 패턴

자바스크립트 패턴이 필요한 이유는, 객체와 방금 배웠던 함수를 효율적으로 사용할 수 있기 때문입니다. 패턴(방법)을 크게 두가지로 나눠보면 
**재사용이 쉽도록 객체를 생성하는 방법**과 **객체들이 상호작용하는 방법**으로 나눠볼 수 있는데요, 이 둘을 구분해서 패턴을 공부해보도록 하겠습니다.

코드를 작성할 땐 의존성을 최소화 시켜서 분리 가능한 코드를 만드는 게 중요합니다. 같은 특징을 모으고 비슷한 것끼리 나눠서 캡슐화를 시켜줘야 하죠. 
한 그룹(Class)에 **최소한의 의존성**을 갖게 만들어 서로 분리될 수 있게 하는 게 핵심입니다. 너무 밀접한 관계를 갖게 해도 하나의 변화가 전체 클래스의 변화를 초래하기 때문에 주의해야 합니다.

프로젝트를 진행하다 보면, 변화는 늘어나고 객체간의 상호작용은 예상치 못한 방향으로 흘러가기 마련입니다.
그러므로 객체를 생성할 때 다음 패턴들을 염두에 두어야 합니다.

## 재사용이 쉽도록 객체를 생성하는 방법

### 추상 팩토리

아디다스와 나이키 신발 공장이 있습니다. 손님이 주문을 하면 해당 브랜드를 찍어서 신발을 만들어주면 됩니다. 
공장은 그대로 있고 브랜드만 바꿔주면 되니! 매우 편하죠. 이렇게 **비슷한 구조**를 갖고 있지만 **대규모로 변경**하고 싶을 때 추상 팩토리 패턴이 유용합니다. 

먼저, 필요한 클래스들을 만들어줍니다. 아디다스랑 나이키가 뭘 하는지 여기서 정하죠.

```javascript
var Adidas = (function() {
  function Adidas() {
  }
  ...
  Adidas.prototype.makeShoes = function(num) {
    return "아디다스신발이 " + num + "개 만들어졌습니다.";
  }
  return Adidas;
})();

var Nike = (function() {
  function Nike() {
  }
  ...
  Nike.prototype.makeShoes = function(num) {
    return "Nike신발이 " + num + "개 만들어졌습니다.";
  }
  return Nike;
})();
```

그다음, 공장을 만들어줍니다. 팩토리들은 서로 비슷하게 생겼지만 **다른 객체**를 갖고 있죠. `AdidasFactory` 에서는 `Adidas` 제품을 만들고, 
`NikeFactory` 에서는 `Nike` 제품을 만드네요.

```javascript
var AdidasFactory = (function() {
  function AdidasFactory() {
  }
  AdidasFactory.prototype.getRule = function() {
    return new Adidas;
  }
  ...
  return AdidasFactory;
})();

var NikeFactory = (function() {
  function NikeFactory() {
  }
  NikeFactory.prototype.getRule = function() {
    return new Nike;
  }
  ...
  return NikeFactory;
})();
```

마지막으로, 이 공장을 한번에 구동시킬 수 있는 관리자 공장을 만들어줍시다.

```javascript
var decisionFactory = (function() {
  function decisionFactory(abstractFactory) {
    this.abstractFactory = abstractFactory;
  }
  decisionFactory.prototype.makeShoes = function(num) {
    this.abstractFactory.getRule().makeShoes(num);
  };
  return decisionFactory;
})();
```

자... 이젠 `Adidas`에서 만들던지 `Nike`에서 만들던지 원하는 공장에서 쉽게 제품을 제작할 수 있을거에요.

```javascript
var adidasOrder = new decisionFactory(new AdidasFactory());
adidasOrder.makeShoes(100); // "아디다스 신발이 100개 만들어졌습니다."

var nikeOrder = new decisionFactory(new NikeFactory());
nikeOrder.makeShoes(300); // "나이키 신발이 300개 만들어졌습니다."
```

처음엔 왜이렇게 꼬아놨나... 답답하고 이해하기 어려웠는데, 직접 코드 작성해보니 감을 잡은 것 같습니다!

- 나중에 Factory들이 바껴도 쉽게 수정할 수 있다. 
- 쉽게 객체를 찍어낼 수 있다.
- 맨 처음 팩토리의 구체적인 유형을 모르더라도 객체를 생성할 수 있다.


참고) 자바스크립트 디자인 패턴, 사이먼 팀스, PACKT

