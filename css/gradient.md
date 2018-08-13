# Gradient
[http://aboooks.tistory.com/362](http://aboooks.tistory.com/362)

- linear-gradient, radial-gradient, repeating gradient 가 있다.

## linear-gradient

```css
background-image: linear-gradient(방향 | 각도, 시작색상, (option색상), 끝색상) 
```

- css 의 gradient 는 color 속성이 아니라 image 속성이다.
- 그래서 background 또는 background-image 에 값을 넣어준다.
- 방향, 각도를 지정할 수 있다.
- 기본값은 위에서 아래로
- 끝 위치에 to 를 붙여서 방향을 지정해준다. `to top right / to bottom left ...`
- gradient 색상을 만들기 위해 시작색상, 끝색상이 필요하다. 그 사이에 다른 색상을 집어넣을 수도 있다.
- 브라우저마다 지원되는게 다르기 때문에 표준코드를 맨 마지막에 적고, 나머지를 추가적으로 적어줘야 한다.

```css
#linear-gradient {
  background-color: skyblue; /* fallback */
  background: -webkit-linear-gradient(skyblue, white); /* Safari 5.1 ~ 6.0, chrom 10.0 ~ 25 */
  background: -o-linear-gradient(skyblue, white); /* Opera 11.1 ~ 12.0 */
  background: -moz-linear-gradient(skyblue, white); /* Firefox 3.6 ~ 15 */
  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='16진수 색상값', endColorstr='16진수 색상값'); /* IE6 ~ 8 */
  -ms-filter: "progid: DXImageTransform.Microsoft.gradient(startColorstr='16진수', endColorstr='16진수')"; /* IE8+ */
  background: linear-gradient(skyblue, white); /* 표준문법 */
}
```


