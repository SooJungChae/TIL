index.html
```html
<!DOCTYPE html>
<head>
  <title> Make Hash code </title>
  <!-- <script src="./hashcode.js"></script> -->
</head>
<body>
  <input id="originalText" type="input" />
  <label id="result"></label>
  <button type="button">해시코드 변환</button>
  <script type="text/javascript">
  var SooHashCode = (function() {
    var sooHashCode = function() {
      this.size = 11;
      var hashTable = [this.size];
    };

    sooHashCode.prototype.Contains = function (key) {
    };

    sooHashCode.prototype.RemoveKey = function (key) {
    };

    sooHashCode.prototype.CollisionMaxCount = function () {
    };

    sooHashCode.prototype.Put = function (key) {
      var idx = key % this.size;
      this.hashTable[idx] = key;
      console.log(this);
    };

    return sooHashCode;
  })();

  console.log(SooHashCode.prototype.Put(10));
  // 이렇게 하고싶은데?
  // console.log(SooHashCode.Put(10));
    
  </script>
</body>
</html>
```
