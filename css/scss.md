(참고) 아래 SCSS 와 CSS 구문을 볼 수 있는데, 아랫부분에 구현된 CSS 는 SCSS 파일이 컴파일된 모습입니다.
# SCSS
- CSS 가 동작하기 전에 사용하는 기능으로, CSS 전처리기 이다.
- CSS 와 유사하지만, 선택자의 중첩, 조건문, 반복문, 단위 연산 등 많은 기능을 편리하게 작성할 수 있다.
- - https://heropy.blog/2018/01/31/sass/

## 중첩 (Nesting)
- 상위 선택자의 반복을 피하고, 편리하게 복잡한 구조를 작성할 수 있다.
```scss
.section {
  width: 100%;
  .list {
    padding: 20px;
    li {
      float: left;
    }
  }
}
```
```css
.section {
  width: 100%;
}
.section .list {
  padding: 20px;
}
.section .list li {
  float: left;
}
```

## 상위 선택자 참조 (Ampersand)
- 중첩 안에서, & 키워드는 부모 선택자를 참조하여 치환한다.
예제 1)
```scss
.btn {
  position: absolute;
  &.active {
    color: red;
  }
}

.list {
  li {
    &:last-child {
      margin-right: 0;
    }
  }
}
```
```css
.btn {
  position: absolute;
}
.btn.active {
  color: red;
}
.list li:last-child {
  margin-right: 0;
}
```
예제 2)
```scss
.fs {
  &-small { font-size: 12px; }
  &-medium { font-size: 14px; }
  &-large { font-size: 16px; }
}
```
```css
.fs-small {
  font-size: 12px;
}
.fs-medium {
  font-size: 14px;
}
.fs-large {
  font-size: 16px;
}
```
## @at-root
- 중첩에서 벗어난다.
- 중첩 안에서 생성하되, 중첩 밖에서 사용해야 하는 경우.
```scss
.list {
  $w: 100px;
  $h: 50px;
  li {
    width: $w;
    height: $h;
  }
  @at-root .box {
    width: $w;
    height: $h;
  }
}
```
```css
.list li {
  width: 100px;
  height: 50px;
}
.box {
  width: 100px;
  height: 50px;
}
```

## 중첩된 속성
- `font-`,`margin-` 처럼 동일한 네임 스페이스를 가지는 속성들 
```scss
.box {
  font: {
    weight: bold;
    size: 10px;
    family: sans-serif;
  };
  margin: {
    top: 10px;
    left: 20px;
  };
  padding: {
    bottom: 40px;
    right: 30px;
  };
}
```
```css
.box {
  font-weight: bold;
  font-size: 10px;
  font-family: sans-serif;
  margin-top: 10px;
  margin-left: 20px;
  padding-bottom: 40px;
  padding-right: 30px;
}
```

## $
- 반복되는 변수 앞에 붙인다.
```scss
$color-primary: #e96900;
$url-images: "/assets/images/";
$w: 200px;

.box {
  width: $w;
  margin-left: $w;
  background: $color-primary url($url-images + "bg.jpg");
}
```
```css
.box {
  width: 200px;
  margin-left: 200px;
  background: #e96900 url("/assets/images/bg.jpg");
}
```

변수를 재할당 할수도 있다.
```scss
$red: #FF0000;
$blue: #0000FF;

$color-primary: $blue;

.box {
  color: $color-primary;
}
```

## !global
- 전역 설정
```scss
.box1 {
  $color: #111 !global;
  background: $color;
}
```
- 변수의 스코는 { } 선언된 블록 안에서만 이지만,
- !global 로 선언하면 { } 밖에서도 사용 가능하다.

## !default
할당되지 않은 변수 초기화. 할당된 값이 있으면 기존 값을 사용한다.
```scss
$color-primary: red;

.box {
  $color-primary: blue !default;
  background: $color-primary;
}
```
```css
.box {
  background: red;
}
```

## { }
어디서든지 변수 값을 넣을 수 있다.
```scss
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=#{$family}");
```

## @import
여러 sass 파일을 단일 css 출력 파일로 병합
```scss
@import "hello.css";
@import "http://hello.com/hello";
@import url(hello);
@import "hello" screen;

// 여러 파일 가져오기
@import "header", "footer";
```
- 기본적으로 sass 파일을 가져온다.

## Partial 
`_` 를 사용해 부분 파일임을 나타낸다.
```
Sass-App
  # ...
  ├─scss
  │  ├─_header.scss
  │  ├─_side-menu.scss
  │  └─main.scss
  # ...
```
- 메인 파일만 `_`를 사용하지 않고
- 나머지에 언더바를 붙이면, 새로운 파일이 생기지 않고 참조만 해서 사용된다.
```scss
// main.scss
@import "header", "side-menu";
```
컴파일
```
$ node-sass scss --output css
```

## 연산
- 더하기 곱하기 나누기 등 다양한 연산이 사용가능하다.
- 나누기 할 땐, ( ) 안에 넣어야 인식된다.
- 문자는 ` row + "-reverse" + " " + wrap` -> `row-reverse wrap;`

## @mixin
- 재사용 가능한 기능을 만드는 방식
- https://www.codingfactory.net/10110
```scss
@mixin mixin-name {
  // code
}

// 인자 포함
@mixin mixin-name( $arg1, $arg2, ... ) {
  // code
}
```

사용
```css
@include mixin-name;
@include mixin-name( value1, value2, ... );
```

예제 1)
```scss
@mixin jb {
  p {
    color: red;
  }
}
@include jb;
```
```css
p {
  color: red; }
```

예제 2) 선택자 안에서 사용할 수 있다.
```scss
@mixin jb {
  color: red;
}
p {
  @include jb;
}
```

예제 3) 인자 사용
```scss
@mixin jb( $margin, $color ) {
  margin: $margin;
  color: $color;
}
p {
  @include jb( 20px 0px, red );
}
```
```css
p {
  margin: 20px 0px;
  color: red; }
```

예제 4) 인자 값 설정 안하면 기본값 사용
```scss
@mixin jb( $margin, $color: blue ) {
  margin: $margin;
  color: $color;
}
p {
  @include jb( 20px 0px );
}
```
```css
p {
  margin: 20px 0px;
  color: blue; }
```

## @if
```scss
// @if
@if (조건) {
  /* 조건이 참일 때 구문 */
}

// @if @else
@if (조건) {
  /* 조건이 참일 때 구문 */
} @else {
  /* 조건이 거짓일 때 구문 */
}

// @if @else if
@if (조건1) {
  /* 조건1이 참일 때 구문 */
} @else if (조건2) {
  /* 조건2가 참일 때 구문 */
} @else {
  /* 모두 거짓일 때 구문 */
}

// () 생략 가능
$bg: true;
div {
  @if $bg {
    background: url("/images/a.jpg");
  }
}
```

## @for
```scss
// through
// 종료 만큼 반복
@for $변수 from 시작 through 종료 {
  // 반복 내용
}

// to
// 종료 직전까지 반복
@for $변수 from 시작 to 종료 {
  // 반복 내용
}
```

## @each
List 와 Map 데이터 반복
```scss
// List Data
$fruits: (apple, orange, banana, mango);

.fruits {
  @each $fruit in $fruits {
    li.#{$fruit} {
      background: url("/images/#{$fruit}.png");
    }
  }
}
```

## @while
```scss
$i: 6;

@while $i > 0 {
  .item-#{$i} {
    width: 2px * $i;
  }
  $i: $i - 2;
}
```

## 내장함수
### index()
```scss
$fruits: (apple, orange, banana, mango);

.fruits {
  @each $fruit in $fruits {
    $i: index($fruits, $fruit);
    li:nth-child(#{$i}) {
      left: 50px * $i;
    }
  }
}
```