# Repaint

# Reflow

웹 페이지 전체나 일부를 렌더링할 때 
문서 내 요소의 위치와 도형을 다시 계산하는 웹브라우저 프로세스의 이름이다.

**Reflow 되는 경우**
- 브라우저 창 크기 변경
- computed style 자바스크립트 메소드
- DOM 요소 추가 / 삭제
- 클래스 변경

리플로우를 할 때 CPU 가 사용되며  
이 시간동안 브라우저에서 사용자를 차단한다. (움직이지 않는다.) 

=> Reflow 를 최대한 줄여야 한다.

**가이드라인**
- Reduce DOM tree 
- 복잡한 CSS 선택기, 특히 하위 요소 선택기 사용하지 않기 -> 높은 CPU 처리량 필요 


## 참고
- [브라우저 리플로우 최소화](https://developers.google.com/speed/docs/insights/browser-reflow)
- [웹페이지를 표시한다는 것: 브라우저는 어떻게 동작하는가](https://developer.mozilla.org/ko/docs/Web/Performance/How_browsers_work)
- [code.google.com/speed ](code.google.com/speed )
