# 제이쿼리 없이 여러 태그에 이벤트를 동시에 다는 방법
[https://www.zerocho.com/category/HTML/post/5a76d1eaabd090001b981ba6](https://www.zerocho.com/category/HTML/post/5a76d1eaabd090001b981ba6)

```javascript
Array.prototype.forEach.call(document.querySelectorAll('.del-btn'), function(btn) {
    btn.addEventListender('click', function(e) {
      // 여기를 작성한다.
    });
  });
```
