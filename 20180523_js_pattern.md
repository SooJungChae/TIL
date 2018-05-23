다음 내용들은 PACKT 출판사의 사이먼 팀스가 지은 자바스크립트 디자인 패턴 서적을 보며 정리한 내용이며 
이해가 안가는 부분은 직접 추가했습니다.
***

# 프로토타입 패턴
프로토타입은 **상속**을 지원하는 패턴이다.

기존 구성되어 있는 객체를 복사하는 건 매우 유용하고 편리하다. 
- 기존의 인스턴스를 저장함으로써 쉽게 객체 상태 기록을 유지할 수 있다.
복잡한 객체를 단 한 번만 생성하고, 약간의 변화가 있는 다수의 객체로 복사 될 수 있도록 허용한다.
즉, 원본 객체가 복잡할수록 얻는 이득이 크다.


생성패턴


구조패턴
객체들이 상호작용할 수 있는 간단한 방법
디자인을 쉽게 해주는 패턴이다.
- 적응자
- 가교
- 복합체
- 장식자
- 퍼사드


## 적응자 패턴

적응자 패턴은 객체를 생성하는게 목적이 아니라, 기존에 있던 구조를 새 구조로 전환하거나 새 구조에서 기존의 구조로 전환하는 데 사용하는 패턴입니다.
[원문: https://www.zerocho.com/category/JavaScript/post/57babe9f5abe0c17006fe230](https://github.com/airbnb/javascript)

"로마에 가면 로마 법을 따라야 한다" 라는 말을 생각해보세요.
한국에 있으면 한국 법을 따라야 하지만, 다른 나라에 가면 다른나라 법을 따라야 하죠. 적응자(Adapter)를 사용하면 쉽게 구현 가능합니다. 

```javascript
var law = new law(romaAdapter); // 로마법
var law = new law(koreaAdapter); // 한국법
```
내부는 이렇게 구현되어 있어요.
```javascript
var law = (function() {
  function law(adapter) {
    this.adapter = adapter;
  }
  law.prototype.vote = function() {
    this.adapter.vote();
  };
  return law;
})();
```
```javascript
var romaAdapter = {
  vote: function() {
    console.log("로마에서 투표");
  }
};
```
```javascript
var koreaAdapter = {
  vote: function() {
    console.log("에서 투표");
  }
};
```
이런식으로 두 가지 이상의 구조에서 유연하게 전환하고 싶을 때 **적응자**패턴을 사용합니다.

## 추상 팩토리 패턴
[출처: https://joshua1988.github.io/web-development/javascript/javascript-pattern-design/#%ED%8C%A9%ED%86%A0%EB%A6%AC-%ED%8C%A8%ED%84%B4] (https://joshua1988.github.io/web-development/javascript/javascript-pattern-design/#%ED%8C%A9%ED%86%A0%EB%A6%AC-%ED%8C%A8%ED%84%B4)
비슷한 객체를 공장 찍어내듯이 반복적으로 생성할 수 있습니다.
구체적인 유형을 몰라도 객체 생성이 가능하다는 특징이 있습니다.
다양한 구현이 가능합니다.




## 인터페이스
코드를 짤 땐 세부사항들을 나눈 단순한 조각들을 만들어야 합니다. 이걸 인터페이스라 하죠.
즉, 인터페이스는 객체가 어떠한 property 와 method 를 가지고 있다고 선언하는 것입니다.
(여기선 선언만 하고 실제적인 구현은 클래스가 해줍니다.)
이걸 분리해준다면 불필요한 메소드와 의존 관계를 갖지 않아, 객체 지향 설계 원칙인 **인터페이스 분리의 원칙**을 해결해줍니다.





