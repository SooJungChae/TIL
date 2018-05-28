다음은 [https://learn.jquery.com/plugins/advanced-plugin-concepts/](https://learn.jquery.com/plugins/advanced-plugin-concepts/) 
이 사이트를 번역, 의역한 글입니다. 부족한 부분이나 틀린부분은 pull request 부탁드립니다 :)

---

# 고급 플러그인 만들기
## 기본 플러그인 셋팅에 접근할 수 있게 만드세요

우리는 가능하면 플러그인을 개발할 때, 기본 셋팅을 노출해야합니다. 플러그인 사용자들이 override/customize 하는 데 매우 중요하기 때문이죠.
그리고 function 의 장점을 사용할 수 있습니다.

```javascript
// custom 플러그인을 정의하고 있습니다.
$.fn.hilight = function(options) {
  
  // default 옵션에 새로운 options 을 더해 확장시키고 있습니다.
  // 첫번째 argument 는 빈 공간이고요,
  // 이 객체는 default 객체를 overriding 할 수 있게 해줍니다.
  var opts = $.extend( {}, $.fn.hilight.defaults, option );
};

// 플러그인 함수의 property 로 추가된 defaults 객체 입니다. 
$.fn.hilight.defaults = {
  foreground: "red",
  background: "yellow"
}
```

만약 다음처럼 defaults 속성을 바꿔준다면, 플러그인 메소드를 호출할 때 foreground 가 `blue`로 바뀐 걸 볼 수 있습니다.

```javascript
// 맨 처음! 단 한번만 호출됩니다.
$.fn.hilight.defaults.foreground = "blue";

... 

// 호출은 이렇게 해요.
$("#myDiv").higlight();
```

여기서 보시다시피, 사용자는 단 한 줄만으로 플러그인의 기본 색상을 바꿀 수 있습니다. 
그리고 원할 때 **언제든지** 다시 색상을 바꿀 수 있습니다.

```javascript
$("#green").hilight({
  foreground: "green"
});
```

## 응용가능한 2차 함수에 접근할 수 있도록 해주세요

이 방법은 여러분의 플러그인을 확장시킬 수 있는 방법입니다. 
예를 들어, 플러그인에 정의되어 있는 "format" 이라 불리는 function 이 텍스트를 hilight 시키는 플러그인을 작성해볼께요.
플러그인에 정의되어 있는 기본 포맷은 다음과 같겠네요. 

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

저흰 쉽게 다른 옵션 객체에 있는 프로퍼티를 지원할 수 있죠. default 포맷을 override 하면서 콜백 함수를 허락합니다. 
다른 훌륭한 방법은! 여러분의 플러그인을 커스터마이징 하는 겁니다. 
이 기술은 실제로 format 함수를 재정의 될 수 있도록 노출시키는 단계를 먼저 필요로 합니다. 
이 기술로 여러분의 플러그인을 override 하는 게 가능해집니다. 다시 말해서, 우리의 플러그인을 만들 수 있다는 거죠.

여기서 만드는 플러그인을 언제 사용할지 궁금하실 겁니다. [Cycle Plugin]() 이라는 곳에서 실제 사용하고 있구요, 
이 플러그인은 scroll, slide, fade 등등 슬라이드 쇼에 필요한 효과들을 지원하는 플러그인입니다. 
그런데 실제로 slide 변경에 적용할 수 있는 효과가 없어요. 그래서 확장성이 유용하게 사용된답니다.
Cycle Plugin 은 "변경" 하는 객체를 사용자들이 쉽게 커스터마이징 할 수 있습니다.

```javascript
$.fn.cycle.transitions = {
  // ...
};
```

## private 함수를 private 하게 둡시다.

여러분의 플러그인에서 노출시킨 부분을 오버라이드하는건 매우 파워풀합니다. 
그런데, 생각해봐야할 건 어떤 부분을 노출시킬 건지에 대한 것입니다.
한번 노출되면, argument 를 호출하는 거나 semantic 변경에 대해서 염두해 두고 있어야 하죠. 안그러면 연결이 깨져버리고 말꺼에요.
그래서 기본적인 규칙은, 특정 함수가 노출시켜야하는 곳인지 아닌지 모른다면 그냥 하지 마시라는 겁니다.

그럼 어떻게 더 많은 함수들을 노출시키지 않고 사용할수가 있을까요? 바로 **`closure`**가 해준답니다. 
설명하기 위해서 "debug" 라 불리는 새로운 플러그인을 추가해볼께요. 이 debug 함수는 콘솔에 선택된 요소가 몇 개인지 출력해줄겁니다.
자, 클로저를 만들기 위해서, 전체 플러그인 정의를 function 안에 묶어볼게요~

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

위 코드의 debug 메소드 부분은 클로저 밖에서 접근할 수 없습니다. private 구현이 되었네요~

## Bob 과 Sue

Bob 이 나쁜 갤러리 플러그인을 만들었다(이름하여 superGallery). 
이 플러그인은 이미지의 리스트를 가져오고 움직이게 할 수 있다.
Bob 은 이걸 더 흥미롭게 하기 위해 애니메이션을 만들어봤다.

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
  
  // 위에서 했었죠? {} 에 defaults 와 options 을 merge 시킨 값이 들어갑니다.
  var settings = $.extend( {}, defaults, options);
  
  return this.each(function() {
    // ...
  });
};
```

아마도 첫번째로 드는 생각은 얼마나 큰 플러그인을 커스터마이징 해야하는 것일 겁니다. 
가상이 아니라면 훨씬 많은 것들이 필요할 수 있겠죠.

우리의 친구 Bob 은 이게 전부 괜찬핟고 생각하고 있습니다.
사실, 그는 plugin 에 감동받았고 이정도 커스터마이징에 괜찮다 생각하죠.
이 모든 옵션들이 다양한 상광에서 사용할 수 있는 솔루션에서 사용할 수 있을 거라고 믿고 있습니다.

Sue 는 다른 친구인데요, 새로운 플러그인을 만들기로 결심했죠. 플러그인을 몇분 갖고 놀아보니, 
각각의 이미지 width 가 낮은 스피드로 동작하면 더 좋아보일거라 생각했습니다.
그래서 Bob 의 문서를 찾아봤는데, 이런! `animateWidthDuration` 옵션이 없네요.

## 문제가 보이십니까?

플러그인에 얼마나 많은 옵션이 필요한게 중요한게 아니라 어떤 옵션을 갖고 있느냐가 중요한 거랍니다!

Bob은 그가 제공한 커스터마이징 퀄리티는 좋아보이지만, 사실 매우 낮습니다.
이 플러그인을 사용할 사용자가 원하는 모든 가능성을 고려하지 않았거든요.
Bob 은 너무나 정확한 옵션들만을 많이 만들어놓은 것에 실수를 했습니다.
커스터마이징하기 너무 어렵잖아요!

## 그러니, 더 좋은 모델로 만들어봅시다

Bob 은 새로운 커스터마이징모델이 필요하게 됐어요. Bob 이 고레벨의 단순함으로 가게 된 이유는
jQuery 프레임워크가 너무 많은걸 빌려주고 있기 때문이에요. `previousButtionTextColor` 옵션을 제공하는건 좋고 심플해요.
하지만, 과반수의사람들은 더 많은 컨트롤을 원한답니다!

여기, 몇개의 팁이 있습니다. 플러그인을 커스터마이징하기 더 쉽게 만들어봅시다.

## 여러분의 Plugin 에만 최적화 된 구문을 만들지 마세요.

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

사람들이 갖고 있는 레벨은 제한적일 뿐만 아니라, 꽤 많은 공간을 차지하고 있습니다. 
시간을 delay 시키는데 12줄이나 낭비하고 있네요. 
더 좋은 방법은, 이 옵션을 구조화시켜서 사용자들이 시간을 알아서 입력하게 하는 방법입니다.

여기서의 중요한 부분은 추상을 통해 제어 수준을 줄이는게 아닙니다. 
추상이 무엇이든 단순하면 할 수록 사람들은 ...

## 요소들의 전체 컨트롤을 주세요.

만약 여러분의 플러그인이 DOM 에서 사용하는 요소들을 만든다면, 
사용자가 그 요소에 접근할 수 있는 방법을 제공하는 플러그인을 만드는 게 좋습니다.
ID 나 Class 를 주는걸 생각할 수도 있는데, 여러분의 플러그인은 이런 것에 의존해서는 안됩니다.

나쁜 예를 보겠습니다.

```javascript
$( "<div class='gallery-wrapper' />" ).appendTo( "body" );
 
$( ".gallery-wrapper" ).append( "..." );
```

사용자가 정보에 접근하거나 다루도록 하기 위해서 플러그인의 셋팅을 하는 변수에 포함할 수 있지만,
더 좋은 방법은 

```javascript
// 내부 참조를 포함하고 있습니다.
var wrapper = $("<div/>")
  .attr( settings.wrapperAttrs )
  .appendTo( settings.container );
  
// 나중에 참조하기에도 편합니다.
wrapper.append("...");
```

참조를 만들었고, `.attr()`메소드를 호출해서 특정 속성을 요소에 추가했다는걸 알고 계세요.
그래서, 우리의 셋팅에서 이건 다음처럼 사용될 수 있습니다.
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

`$.extend()` 메소드를 사용하면 모든 하위 요소들을 되풀이하면서 merge 합니다.

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

## 콜백을 가능하게 하기

*콜백이란?* - 콜백은 함수가 나중에 호출될 때, 즉 이벤트에 의해서 발생되는 함수입니다.
argument 를 패스하고, 컴퍼넌트의 호출을 할 때 사용되는데, 여기선 jQuery 플러그인을 호출할 때 사용되겠죠.

만약 플러그인이 이벤트로 인해서 호출된다면, 이벤트마다 콜백을 제공하는게 좋은 방법이 될 수 있습니다.
게다가, 콜백마다 여러분만의 이벤트를 만들수도 있죠.
이 갤러리 플러그인에서 `onImageShow`라는 콜백을 만들어보겠습니다.

```javascript
var defaults = {

  // 빈 function 을 만들면 호출할 때 있는지 없는지 체크할 필요가 없습니다.
  onImageShow: function() {},
  // ...
};

// 나중에! 이렇게 사용해요.

nextButton.on("click", showNextImage);

function showNextImage() {
  
  // 다음 이미지 노드를 리턴하는 부분입니다. 여기선 안만들었어요.
  var image = getNextImage();
  
  // ...
  
  // 콜백을 여기서 합니다:
  settings.onImageShow.call(image);
}
```

괄호를 넣는 전통적인 방식을 사용해서 콜백을 하지 않고,
`image`의 컨텍스트 안에서 콜백을 호출했습니다.
이 예제에서, 콜백 안에서 `this`키워드를 통해 실제 이미지 노드에 접근할 수 있다는 겁니다.

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

여러분의 플러그인은 모든 상황에서 적용될 수 없을 겁니다. 
컨트롤을 제공하지 않거나 조금 제공해도 유용하지 않겠죠.
하지만, 기억하세요, 이건 협력하는 작업이 될 것입니다.
유념해야할 3가지 입니다.

- *유연성Flexibility* : 얼마나 많은 상황들을 고려할 것인지?
- *크기Size*
- *성능Performance* : 속도에 영향을 미치나요? 오버헤드를 일으키는 원인이 되나요?
