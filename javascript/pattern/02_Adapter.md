자바스크립트 디자인 패턴을 공부하는 두번째 페이지! 객체들이 상호작용하는 방법에 관한 글입니다 :) 

- [자바스크립트 디자인 패턴 - 1. 재사용이 쉽도록 객체를 생성하는 방법](https://github.com/SooJungChae/TIL/blob/master/20180523_js_pattern.md)
- 자바스크립트 디자인 패턴 - 2. 객체들이 상호작용하는 방법
- [자바스크립트 디자인 패턴 - 3. 행동 패턴](https://github.com/SooJungChae/TIL/blob/master/20180526_js_pattern3.md)

# 자바스크립트 디자인 패턴 

## 2. 객체들이 상호작용하는 방법

### 1) 적응자 패턴

적응자 패턴은 **필요한 곳에 적절한 코드를 사용할 수 있도록**해주는 패턴입니다. 
요구된 인터페이스를 단순한 코드조각으로 제공해주는게 목적입니다. 

다음 `Ship` 인터페이스를 보세요. (인터페이스는, 객체가 어떤 프로퍼티와 메소드를 가졌는지 보여줍니다.)

```javascript
interface Ship {
  SetRudderAngleTo(angle: number); 
  SetSailConfiguration(configuration: SailConfiguration);
  SetSailAngle(sailId: number, sailAngle: number);
  GetCurrentBearing(): number;
  GetCurrentSpeedEstimate(): number;
  ShiftCrewWeightTo(weightToShift: number, locationId: number);
}
```

이 `Ship` 인터페이스는 엄청 복잡하게 생겼네요. 그런데, 생각해보면 배가 동작하는 원리를 우리가 알 필요가 있을까요?
핸들만 움직여주면 알아서 앞으로 가지않습니까? 인터페이스를 단순화 시켜볼께요.

```javascript
interface SimpleShip() {
  TurnLeft();
  TurnRight();
  GoForward();
}
```

적응자 패턴은 이런 단순한 인터페이스를 기반으로 만드는 게 포인트 입니다.

```javascript
var ShipAdapter = (function() {
  function ShipAdapter() {
    this._ship = new Ship();
  }
  ShipAdapter.prototype.TurnLeft = function() {
    this._ship.SetRudderAngleTo(-30);
    this._ship.SetSailAngle(1, 10);
  };
  ShipAdapter.prototype.TurnRight = function() {
    this._ship.SetRudderAngleTo(30);
    this._ship.SetSailAngle(6, -19);
  };
  ShipAdapter.prototype.GoForward = function() {
    ...
  };
  return ShipAdapter;
})();
```

**필요한 함수에 필요한 메소드만을 연결**시키고 있기 때문에 사용자가 쉽게 쓸 수 있어요. 다음처럼요.

```javascript
var ship = new ShipAdapter();
ship.GoForward();
ship.TurnLeft();
```

코드 인터페이스가 매우 간단해졌고, 사용자가 이해하기에도 간단합니다. 이게 바로 적응자 패턴의 특징이랍니다. 
만약 라이브러리를 적응자 패턴으로 랩핑하게 되면 라이브러리를 직접 호출해야 하는 경우를 줄일 수 있어서 다른 라이브러리로 교체하기도 쉽습니다.

### 2) 복합체 패턴
적응자가 너무 복잡해진다면, **복합객체**로 문제를 해결할 수 있습니다.

```javascript
var Ship = (function() {
  function Ship(name, size) {
    this.name = name;
    this.size = size;
  }
  Ship.prototype.GetName = function() {
    return this.name;
  }
  Ship.prototype.GetSize = function() {
    return this.size;
  }
  return Ship;
})();

var CompoundShip = (function() {
  function CompoundShip() {
    this.ships = [];
  }
  CompoundShip.prototype.GetTotSize = function(){
    var names = "";
    for (var i = 0; i < this.ships.length; i++){
      names += this.ships[i].GetSize();
    }
  }
  ...
  return CompoundShip;
})();
```

구성요소들을 돌면서 동일한 동작을 수행할 수 있습니다. 복합체 패턴은 다음과 같이 실행시킵니다.

```javascript
var ShipSoo = new Ship("Soo", 150);
var ShipJun = new Ship("Jun", 200);

var TotShip = new CompoundShip();
console.log(TotShip.GetSize());  // 350
```

여러 구성요소들을 한 번에 적용시킬 수 있네요. 복합체는 트리구조이므로 HTML 을 자주 사용하는 javascript 에서 자주 사용되는 패턴입니다.
