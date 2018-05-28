- [자바스크립트 디자인 패턴 - 1. 재사용이 쉽도록 객체를 생성하는 방법](https://github.com/SooJungChae/TIL/blob/master/20180523_js_pattern.md)
- [자바스크립트 디자인 패턴 - 2. 객체들이 상호작용하는 방법](https://github.com/SooJungChae/TIL/blob/master/20180525_js_pattern2.md)
- 자바스크립트 디자인 패턴 - 3. 행동 패턴

객체 값이 변화될 때를 감지해서 변화된 값을 가져오려면 어떻게 해야할까요?
자바스크립트에서 가장 널리 사용되고 있는 패턴 중의 하나인 감시패턴(Observer)을 알아봅시다.

```javascript
var GetterSetter = (function() {
  function GetterSetter() {
  }
  GetterSetter.prototype.GetProperty = function() {
    return this._property;
  };
  GetterSetter.prototype.SetProperty = function(value) {
    this._property = value;
  };
  return GetterSetter;
})();
```

이때의 SetProperty 함수는 값의 변경에 관심을 가지고 있는 다른 객체를 호출하도록 확장될 수 있다.

```javascript
  GetterSetter.prototype.SetProperty = function(value) {
    var temp = this._property;
    this._property = value;
    this._listener.Event(value, temp);
  };
```

속성이 변경됐음을 리스너에게 통보합니다.
감시자 패턴은 하나의 리스너를 가지지만, 변화에 관심이 있는 여러 리스너들이 변화에 대한 통지를 구독할 수 있게 합니다.

로우를 클릭하면 function 을 하도록~

pdsGrid.prototype.OnRowSelect = function(target) {
  return target;
}

$("#").pdsGrid("onrowselect", function(row) {
  
});

OnRowSelect(e.target);



