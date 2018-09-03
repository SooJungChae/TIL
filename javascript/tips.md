# string 에서 일치하는 것 중 n 번째 가져오기
## indexOf, split
```javascript
var a = "010-2222-3333";
a.indexOf("-"); // 3

function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

getPosition(a, "-", 2); // 8
```

