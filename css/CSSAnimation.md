# CSS animation

## CSS animation 의 장점
- js 애니메이션은 잘 만들어졌더라도 성능이 좋지 못할 때 있다.
CSS 애니메이션은 `frame-skipping` 같은 여러 기술을 이용하기 때문에 최대한 부드럽게 렌더링 된다.
- 브라우저는 애니메이션의 성능을 효율적으로 최적화할 수 있다. (안보이는 엘리먼트의 애니메이션은 업데이트 주기를 줄여 부하를 최소화시킴)

## animation 속성

- animation-delay : 엘리먼트가 로드되고 나서, 언제 애니메이션이 시작될지
  - 초(s) 또는 밀리초(ms) 로 지정
  - `-1s`로 지정하면 즉시 시작되지만, 애니메이션 시퀀스의 1초부터 시작

- animation-direction : 애니메이션이 종료된 후, 어떤 방향으로 진행할지 (순반향, 역방향)
  - **normal**(default)
  - **reverse** 애니메이션 단계가 거꾸로 수행되고, 타이밍 기능 또한 반대로 된다.
  `예) ease-in 타이밍은 ease-out 형태로 변경된다.`
  - **alternate** 매 사이클마다 방향을 뒤집는다.
  `예) 반복1: 정방향, 반복2: 역방향, 반복3: 정방향, ...`
  - **alternate-reverse** alternate 의 반대.
  `예) 반복1: 역방향, 반복2: 정방향, 반복3: 역방향, ...`
  ```css
  /* Single animation */
  animation-direction: normal;
  animation-direction: reverse;
  animation-direction: alternate;
  animation-direction: alternate-reverse;

  /* Multiple animations */
  animation-direction: normal, reverse;
  animation-direction: alternate, reverse, normal;

  /* Global values */
  animation-direction: inherit;
  animation-direction: initial;
  animation-direction: unset;
  ```

- animation-duration : 애니메이션이 한 사이클을 완료하는데 걸리는 시간 지정
    ```css
    /* Single animation */
    animation-duration: 6s;
    animation-duration: 120ms;

    /* Multiple animations */
    animation-duration: 1.64s, 15.22s;
    animation-duration: 10s, 35s, 230ms;
    ```
- animation-iteration-count : 몇 번 반복? `infinite`는 무한
- animation-play-state : 멈추거나 다시 시작할 수 있다.
    - paused, running
    ```css
    /* Single animation */
    animation-play-state: running;
    animation-play-state: paused;

    /* Multiple animations */
    animation-play-state: paused, running, running;

    /* Global values */
    animation-play-state: inherit;
    animation-play-state: initial;
    animation-play-state: unset;
    ```
- animation-fill-mode : 애니메이션이 시작되기 전이나 끝나고 난 후, 어떤 값이 적용될지
    - **none**(default) : 실행되지 않을 때 스타일을 적용하지 않는다.
    - forwards : 마지막 keyframe 상태유지 (direction, iteration-count, last keyframe 값에 따라 다르다는데 .. 나중에 여러번 적용 해봐야 알것같음)
    - backwards : animation-delay 동안 첫번째 keyfram 상태유지.
    - both
    ```css
    .demo {
      border-top: 100px solid #ccc;
      height: 300px;
    }

    @keyframes grow {
      0% { font-size: 0; }
      100% { font-size: 40px; }
    }

    .demo:hover .grows {
      animation-name: grow;
      animation-duration: 3s;
    }

    .demo:hover .growsandstays {
      animation-name: grow;
      animation-duration: 3s;
      animation-fill-mode: forwards;
    }
    ```

- animation-name : 애니메이션의 중간상태. `@keyframes` 규칙을 이용해서 기술한다.
- animation-timing-function : 각 사이클마다 어떻게 상태를 전환할 것인지 지정
    - **single-timing-function** -> linear | cubic-bezier-timing-function | step-timing-function | frames-timing-function
    - **[css transitions](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)** -> 추후 정리예정
    - **step-timing-function** -> step-start, step-end, steps
    - **cubic-bezier-timing-function** -> ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)
    ```css
    /* Keyword values */
    animation-timing-function: ease;
    animation-timing-function: ease-in;
    animation-timing-function: ease-out;
    animation-timing-function: ease-in-out;
    animation-timing-function: linear;
    animation-timing-function: step-start;
    animation-timing-function: step-end;

    /* Function values */
    animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
    animation-timing-function: steps(4, end);
    animation-timing-function: frames(10);

    /* Multiple animations */
    animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);

    /* Global values */
    animation-timing-function: inherit;
    animation-timing-function: initial;
    animation-timing-function: unset;
    ```

## animation 의 중간상태
- `@keyframes` 을 사용해서 중간상태를 지정할 수 있다.
- `percentage` 를 이용해 지정한다.
  - 필수요소 : 0%(애니메이션이 시작된 지점), 100%(끝나는 지점)
  - `from`과 `to`로 사용가능
```css
p {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```
중간 상태를 추가하려면 다음처럼 추가하면 된다.
```css
75% {
  font-size: 300%;
  margin-left: 25%;
  width: 150%;
}
```

좀 더 자연스럽게 만들어주려면 다음처럼 옵션을 추가한다.
애니메이션을 무한 반복하되, 끝나면 역방향으로 애니메이션을 작동시키는 방법이다.
```css
p {
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
```

## 참고사항
- 오래된 브라우저는 접두어가 필요하다. (-webkit-, -moz- 등...)
```css
.slidein {
  -moz-animation-duration: 3s;
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
  -moz-animation-name: slidein;
  -webkit-animation-name: slidein;
  animation-name: slidein;
  -moz-animation-iteration-count: 3;
  -webkit-animation-iteration-count: 3;
  animation-iteration-count: 3;
  -moz-animation-direction: alternate;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
}

@-moz-keyframes slidein {
  from {
    margin-left:100%;
    width:300%
  }

  to {
    margin-left:0%;
    width:100%;
  }
}

@-webkit-keyframes slidein {
  from {
    margin-left:100%;
    width:300%
  }

  to {
   margin-left:0%;
   width:100%;
 }
}

@keyframes slidein {
  from {
    margin-left:100%;
    width:300%
  }

  to {
   margin-left:0%;
   width:100%;
 }
}
```
## 참고사이트
- https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Animations/Using_CSS_animations
