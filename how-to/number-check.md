# javascript 에서 number 체크하는 방법

## x * 1 숫자로 변환한다.

```js
0 * 1 // 0
true * 1 // 1
-10000 * 1 // -10000
99999999999999999999999 * 1 // 1e+23
0.1 * 1 // 0.1
NaN * 1 // NaN
Infinity * 1 // Infinity
-Infinity * 1 // -Infinity
null * 1 // 0
'10' * 1 // 10
{} * 1  // Unexpected token '*'
[] * 1  // 0
'1234ABC' * 1 // NaN
"" * 1 // 1
```

## Number

## isNaN(x)
```js
isNaN(NaN) // true
isNaN(null) // false
isNaN(undefined) // true
isNaN(Infinity) // false
isNaN(-Infinity) // false
isNaN(true) // false
isNaN("true") // true
isNaN("") // false
isNaN('3.14와 숫자가 아닌 문자들'); // true
```

## parseFloat(x) 실수로 변환
```js
parseFloat(NaN) // NaN
parseFloat(null) // NaN
parseFloat(undefined) // NaN
parseFloat(Infinity) // Infinity
parseFloat(-Infinity) // -Infinity
parseFloat(true)  // NaN
parseFloat("true")  // NaN
parseFloat("") // NaN
parseFloat("123") // 123
parseFloat('3.14와 숫자가 아닌 문자들'); // 3.14
```
기호(+, -), 숫자(0,9), 소수점 또는 지수 이외의 문자를 발견하면, 그 전까지의 결과만 반환하고 
문제의 문자와 그 이후는 모두 무시합니다.
위치에 상관하지 않고, 그런 문자를 발견하면 NaN을 반환하는 더 엄격한 방법이 필요하면 Number(value)를 고려하세요.  

## parseInt(x) int 로 변환

## isFinite(x) 유한수인지 판별. **숫자로 먼저 변환한다.**
return : Infinity, NaN, undefined: false / 이외엔 true
```js
isFinite(NaN) // false
isFinite(null) // true
isFinite(undefined) // false
isFinite(Infinity) // false
isFinite(-Infinity) // false
isFinite('123') // true
isFinite('123abc') // false
isFinite("")
```
null 이 number 이기 때문에 true 가 나와버렸다. 제대로 체크하지 못한다.

## typeof x
```js
typeof NaN  // number
typeof null // object
typeof undefined // undefined
typeof Infinity // number
typeof -Infinity  // number
typeof '123' // string
typeof 123 // number
typeof 1.1234 // number`
typeof {} // object
typeof [] // object
typeof true // boolean
```
NaN, Infinity, -Infinity 도 number 로 체크하고 있다. 처리해줘야 하는데, 
이 세가지를 number 로 리턴하지 않는 건 `isFinite` 에서 처리하고 있다.
`x * 1` 로 하지 않는 이유는 null, Infinity, -Infinity, NaN 와 같은 값이 리턴되기 때문이다.
**isFinite 는 true, false 만 리턴한다.**
 
## 결론 : typeof x === number && isFinite(x) 



```js
$scope.ratioCalc = function() {
        // validate
        if($scope.deal._ratioSum){
            // 소수점 두자리까지 입력 가능
            var regexp = /^\d*(\.\d{0,2})?$/;
            if($scope.deal._ratioSum.search(regexp) < 0){
                $scope.deal._ratioSum = Number.parseFloat($scope.deal._ratioSum).toFixed(2);
            }

            // NaN일때 체크
            if(isNaN($scope.deal._ratioSum)){
                $scope.deal._ratioSum = '';
            }

            // 100 보다 작은 수
            if($scope.deal._ratioSum > 100){
                $scope.deal._ratioSum =  $scope.deal._ratioSum.slice(0,-1);
            }

            var commission = '';
            var vat = '';
            if ( !isNaN(parseFloat($scope.deal._ratioSum)) && isFinite($scope.deal._ratioSum) ) {
                commission = ($scope.deal._ratioSum/11*10).toFixed(1);
                vat = ($scope.deal._ratioSum - commission).toFixed(1);
                $scope.deal.vatRatio = vat;
                $scope.deal.commissionRatio = commission;
            }

        }
        
    };
```