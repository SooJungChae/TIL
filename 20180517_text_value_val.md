textbox / dropdown / p / div 태그 등 다양한 요소의 텍스트 값이나 value 값을 바꾸고 싶을 때가 많다.
언제 text 를 써야할지 value, val 을 써야할지 헷갈리기 때문에 정리하고자 한다.

## jQuery
## .text()
일치하는 요소의 text 컨텐츠와 하위 요소들의 text 컨텐츠들을 모두 가져온다.
```
<div class="demo-container">
  <div class="demo-box">Demonstration Box</div>
  <ul>
    <li>list item 1</li>
    <li>list <strong>item</strong> 2</li>
  </ul>
</div>

ref: http://api.jquery.com/text/
```
```
 $( "div.demo-container" ).text(); // Demonstration Box list item 1 list item 2
```
## .val()
일치하는 요소의 첫번째 요소의 현재 값을 가져오거나, 
일치하는 요소들의 값을 셋팅한다.

form 요소의 값을 가져오는데 사용된다.
form 요소들은 input, select, textarea 와 같은 걸 말한다.

value

