다음은 [https://learn.jquery.com/plugins/advanced-plugin-concepts/](https://learn.jquery.com/plugins/advanced-plugin-concepts/) 
이 사이트를 번역, 의역한 글입니다. 부족한 부분이나 틀린부분은 pull request 부탁드립니다 :)

---

# 고급 플러그인 만들기

**[플러그인의 기본 셋팅에 접근할 수 있게 만들기](#플러그인의-기본-셋팅에-접근할-수-있게-만들기)**<br>
**[응용할 수 있도록 2차 기능에 접근할 수 있게 하기](#응용할-수-있도록-2차-기능에-접근할-수-있게-하기)**<br>
**[private 함수는 private 하게 두기](#private-함수는-private-하게-두기)**<br>
**[좋은 플러그인과 안좋은 플러그인 예제(Bob 과 Sue)](#좋은-플러그인과-안좋은-플러그인-예제(Bob-과-Sue))**<br>
**[자신의 Plugin 에만 최적화 된 구문을 만들지 말기](#자신의-Plugin-에만-최적화-된-구문을-만들지-말기)**<br>
**[요소의 전체를 컨트롤 할 수 있게 해주기](#요소의-전체를-컨트롤-할-수-있게-해주기)**<br>
**[콜백 가능하게 하기](#콜백-가능하게-하기)**<br>

## 플러그인의 기본 셋팅에 접근할 수 있게 만들기

가능하면 플러그인을 개발할 때, 기본 셋팅을 **노출**해야합니다. 플러그인 사용자들이 override/customize 하는 데 매우 중요하기 때문이죠.
그리고 function 의 장점을 사용할 수 있습니다.

```javascript
// custom 플러그인을 정의
$.fn.hilight = function(options) {
  
  // defaults 옵션에 새로운 option 을 더해 확장시킨다.
  // 빈 공간에{} default 객체를 기준으로 option 을 overriding 한다.
  var opts = $.extend( {}, $.fn.hilight.defaults, option );
};

// 플러그인에 property 로 추가된 defaults 객체
$.fn.hilight.defaults = {
  foreground: "red",
  background: "yellow"
}
```

만약 다음처럼 defaults 속성을 바꿔준다면, 플러그인 메소드를 호출할 때 foreground 가 `blue`로 바뀐 걸 볼 수 있습니다.

```javascript
// 맨 처음에 이렇게 설정해주면
$.fn.hilight.defaults.foreground = "blue";
... 

// 호출할 때 'blue'로 바꿔져있다.
$("#myDiv").higlight();
```

여기서 보시다시피, 사용자는 단 한 줄만으로 플러그인의 기본 색상을 바꿀 수 있습니다. 
그리고 원할 때 **언제든지** 다시 색상을 바꿀 수 있습니다.

```javascript
$("#green").hilight({
  foreground: "green"
});
```

## 응용할 수 있도록 2차 기능에 접근할 수 있게 하기

이 방법은 여러분의 플러그인을 **확장**시킬 수 있는 방법입니다. 
예를 들어서, "format" function 을 사용하면 텍스트를 하이라이트 시키는 플러그인을 작성해볼께요.
플러그인에 정의되어 있는 기본 포맷은 다음과 같습니다. 

```javascript
// 플러그인 정의
$.fn.hilight = function(options) {
  
  return this.each(function() {
    var elem = $(this);
    
    // ...
    
    var markup = elem.html();
    
    // 우리가 작성했던 format 함수를 불러옵시다.
    markup = $.fn.hilight.format(markup);
    elem.html(markup);
  });
};

// 우리만의 format 함수를 만들었습니다.
$.fn.hilight.format = function(txt) {
  return "<strong>" + txt + "</strong>";
};

```

이렇듯 쉽게 기본값을 override 하면서 옵션 객체의 변경을 쉽게 할 수 있습니다.
다른 훌륭한 방법도 있는데요! 여러분의 플러그인을 커스터마이징 하는 것입니다. 

이 기술은 실제로 format 함수가 재정의 될 수 있도록 노출시키는 단계가 먼저 필요합니다. 

이 기술로 여러분의 플러그인을 override 하는 게 가능해지는데요 
다시 말해서 다른 사람이 우리의 플러그인을 위해 또 다른 플러그인을 만들 수 있다는 거죠.

여기서 만드는 플러그인을 언제 사용할지 궁금하실 겁니다. [Cycle Plugin]() 이라는 곳에서 실제 사용하고 있구요, 
scroll, slide, fade 등등 슬라이드 쇼에 필요한 효과들을 지원합니다.
그런데 실제로 slide 변경에 적용할 수 있는 효과가 없어서 확장에 유용한 플러그인입니다.
Cycle Plugin 은 "변경" 하는 객체를 사용자들이 쉽게 커스터마이징 할 수 있습니다.

```javascript
$.fn.cycle.transitions = {
  // ...
};
```

## private 함수는 private 하게 두기

여러분의 플러그인에서 노출시킨 부분을 오버라이드하는건 매우 파워풀합니다. 
그런데, 생각해봐야할 건 **어떤 부분을 노출시킬 건지**에 대한 것입니다.
한번 노출되면, argument 를 호출하는 거나 semantic 변경에 대해서 염두해 두고 있어야 하죠. 안그러면 연결이 깨져버리고 말꺼에요.
그래서 기본적인 규칙은, 특정 함수가 노출시켜야하는 곳인지 아닌지 모른다면 그냥 하지 마시라는 겁니다.

그럼 어떻게 더 많은 함수들을 노출시키지 않고 사용할수가 있을까요? 바로 **closure**가 해줍니다. 
설명을 위해서 `debug` 라 불리는 새로운 플러그인을 추가해볼께요. 이 debug 함수는 콘솔에 선택된 요소가 몇 개인지 출력해줄겁니다.
클로저를 만들기 위해서 전체 플러그인 정의를 function 안에 묶어주세요.

```javascript
// 클로저 만들기
(function($) {
  
  // 플러그인 정의
  $.fn.hilight = function(options) {
    debug(this);
    // ...
  };

  // debugging 을 위한 private 함수입니다.
  function debug(obj) {
    if (window.console && window.console.log) {
      window.console.log("hilight selection count: " + obj.length );
    }
  };
  
  // ...
})(jQuery);
```

위 코드의 debug 메소드 부분은 클로저 밖에서 접근할 수 없습니다. 이런식으로 private 을 구현합니다.

## 좋은 플러그인과 안좋은 플러그인 예제(Bob 과 Sue)

Bob 이 나쁜 갤러리 플러그인을 만들었습니다(이름하여 superGallery). 
이 플러그인은 이미지의 리스트를 가져오고 움직이게 할 수 있습니다.

```javascript
jQuery.fn.superGallery = function(options) {
  
  // Bob 의 기본값
  var defaults = {
  textColor: "#000",
        backgroundColor: "#fff",
        fontSize: "1em",
        delay: "quite long",
        getTextFromTitle: true,
        getTextFromRel: false,
        getTextFromAlt: false,
        animateWidth: true,
        animateOpacity: true,
        animateHeight: true,
        animationDuration: 500,
        clickImgToGoToNext: true,
        clickImgToGoToLast: false,
        nextButtonText: "next",
        previousButtonText: "previous",
        nextButtonTextColor: "red",
        previousButtonTextColor: "red"
  };
  
  var settings = $.extend( {}, defaults, options);
  
  return this.each(function() {
    // ...
  });
};
```

아마도 첫번째로 드는 생각은 얼마나 큰 플러그인 커스터마이징이 필요할까 하는 겁니다. 
실제 상황에선 정의 되어있는 기본값들 보다 훨씬 많은 것들이 필요할 수 있겠죠?

우리의 친구 Bob 은 이 코드가 괜찮다고 생각하네요.
이 모든 옵션들이 다양한 상광에서 사용할 수 있는 솔루션에서 사용할 수 있을 거라고 믿고 있습니다.

Sue 는 다른 친구인데요, Bob 의 플러그인을 이용해 새로운 플러그인을 만들기로 결심했습니다. 
플러그인을 몇분 갖고 놀아보니, 각각의 이미지 width 가 낮은 스피드로 동작하면 더 좋아보일거라 생각했습니다.
그래서 Bob 이 제공한 문서를 찾아봤는데, 이런! `animateWidthDuration` 옵션이 없네요.

### 문제가 보이십니까?

플러그인에 얼마나 많은 옵션이 필요한게 중요한게 아니라 **어떤 옵션**을 갖고 있느냐가 중요한 거랍니다!

Bob은 그가 제공한 커스터마이징 퀄리티는 좋아보이지만, 사실 매우 낮습니다.
이 플러그인을 사용할 사용자가 원하는 모든 가능성을 고려하지 않았거든요.
Bob 은 너무나 정확한 옵션들만을 많이 만들어두었습니다. 커스터마이징하기 너무 어렵잖아요!

### 그러니, 더 좋은 모델로 만들어봅시다

Bob 은 새로운 커스터마이징모델이 필요하게 됐어요. Bob 의 플러그인이 너무 하이레벨인 이유는
jQuery 프레임워크에서 너무 많은걸 빌려오고 있기 때문이에요. `previousButtionTextColor` 옵션을 제공하는건 좋고 심플합니다.
하지만, 과반수의사람들은 더 많은 컨트롤을 원한답니다!

여기, 몇개의 팁이 있습니다. 플러그인을 커스터마이징하기 더 쉽게 만들어봅시다.

## 자신의 Plugin 에만 최적화 된 구문을 만들지 말기

여러분의 플러그인을 사용하는 개발자는 새로운 언어나 술어를 배울 필요가 없습니다.
Bob 은 `delay` 옵션이 최고의 커스터마이징 옵션을 제공한다고 생각했어요. 그럴까요?

```javascript
var delayDuration = 0;
 
switch ( settings.delay ) {
 
    case "very short":
        delayDuration = 100;
        break;
 
    case "quite short":
        delayDuration = 200;
        break;
 
    case "quite long":
        delayDuration = 300;
        break;
 
    case "very long":
        delayDuration = 400;
        break;
 
    default:
        delayDuration = 200;
 
}
```

이 코드는 제한적일 뿐만 아니라, 꽤 많은 공간을 차지하고 있습니다. 
시간을 delay 시키는데 12줄이나 낭비하고 있네요. 
더 좋은 방법은, 이 옵션을 구조화시켜서 사용자들이 시간을 알아서 입력하게 하는 방법입니다.

...

## 요소의 전체를 컨트롤 할 수 있게 해주기

만약 여러분의 플러그인이 DOM 에서 사용하는 요소들을 만든다면, 
사용자가 그 요소에 접근할 수 있는 방법을 제공하는 플러그인을 만드는 게 좋습니다.
ID 나 Class 를 주는걸 생각할 수도 있는데, 여러분의 플러그인은 이런 것에 의존해서는 안됩니다.

다음은 나쁜 예입니다.

```javascript
$( "<div class='gallery-wrapper' />" ).appendTo( "body" );
 
$( ".gallery-wrapper" ).append( "..." );
```

정보가 너무 정확하고 수정하기도 어려워보이는군요.
더 좋은 방법은 다음 코드처럼 분리를 해서 적용이 편하도록 만드는 겁니다.

```javascript
// 내부 참조를 포함하고 있습니다.
var wrapper = $("<div/>")
  .attr( settings.wrapperAttrs )
  .appendTo( settings.container );
  
// 나중에 참조하기에도 편합니다.
wrapper.append("...");
```

참조를 만들었고, `.attr()`메소드를 호출해서 특정 속성을 요소에 추가했습니다.
셋팅할 땐 다음처럼 사용될 수 있습니다.

```javascript
var defaults = {
  wrapperAttrs : {
    class: "gallery-wrapper"
  },
  //...
};

// extend 첫번째 파라미터값을 true 로 지정하면 DEEP COPY 를 하겠다는 의미입니다.
var settings = $.extend(true, {}, defaults, options);
```

이 플러그인 유저는 이제 어떤 요소든 구체화시킬 수 있게 되었네요. 만약 CSS 스타일을 훅이 필요하다면,
class 추가나 ID 이름을 바꾼다던지 하는 작업이 쉬울 겁니다.

```javascript
var defaults = {
  wrapperCSS: {},
  // ...
};

// 나중에 이런 식으로 wrapper 를 지정해둔 곳에 사용할 수 있습니다.
var wrapper = $("<div/>")
  .attr( settings.wrapperAttrs )
  .css( settings.wrapperCSS ) // ** Set CSS!
  .appendTo( settings.container );
```

이제 여러분의 플러그인에서 개발자가 CSS 스타일을 추가할 수 있습니다. 
요소의 selector 를 가져올 필요 없이 편리하게 style 을 셋팅해주면 된답니다.

## 콜백 가능하게 하기

*콜백이란?* - 콜백은 함수가 나중에 호출될 때, 즉 이벤트에 의해서 발생되는 함수입니다.
argument 를 패스하고, 컴퍼넌트의 호출을 할 때 사용되는데, 여기선 jQuery 플러그인을 호출할 때 사용되겠죠.

만약 플러그인이 이벤트로 인해서 호출된다면, 이벤트마다 콜백을 제공하는게 좋은 방법이 될 수 있습니다.
게다가, 콜백마다 여러분만의 이벤트를 만들수도 있죠.
갤러리 플러그인에서 `onImageShow`라는 콜백을 만들어보겠습니다.

```javascript
var defaults = {

  // 빈 function 을 만들면 호출할 때 있는지 없는지 체크할 필요가 없다.
  onImageShow: function() {},
  // ...
};

// 나중에 이렇게 사용하자.

nextButton.on("click", showNextImage);

function showNextImage() {
  
  // 다음 이미지 노드를 리턴하는 부분.
  var image = getNextImage();
  // ...
  
  // 콜백을 여기서 한다:
  settings.onImageShow.call(image);
}
```

괄호를 넣는 전통적인 방식의 콜백을 사용하지 않고, `image`의 컨텍스트 안에서 콜백을 호출했습니다.
콜백 안에서 `this`키워드를 통해 실제 이미지 노드에 접근할 수 있습니다.

```javascript
$( "ul.imgs li" ).superGallery({
    onImageShow: function() {
        $( this ).after( "<span>" + $( this ).attr( "longdesc" ) + "</span>" );
    },
 
    // ... other options ...
});
```

비슷하게 다른 부분에서도 `onImageHide`콜백을 추가할 수 있습니다.
콜백의 요점은 사용자가 쉽게 사용할 수 있고 소스를 팔 필요 없이 기능을 추가할 수 있다는 겁니다.

## 기억하세요, 플러그인은 협력이 필요합니다.

여러분의 플러그인은 모든 상황에서 적용될 수 없습니다. 
컨트롤을 아예 제공하지 않거나 조금 제공해도 유용하지 않겠죠.
하지만, 기억하세요. 이건 협력하는 작업입니다. 플러그인을 작성할 때 유념해야할 3가지를 알려드리겠습니다.

- *유연성Flexibility* : 얼마나 많은 상황들을 고려할 것인지?
- *크기Size*
- *성능Performance* : 속도에 영향을 미치나요? 오버헤드를 일으키는 원인이 되나요?
