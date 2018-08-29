# event.target 과 event.currentTarget 의 차이점

- event.target 은 버블링 될 때의 최하위 객체를 리턴하고
- event.currentTarget 은 그 이벤트가 발생된 객체를 리턴한다.

![target 과 currentTarget 비교](https://user-images.githubusercontent.com/12723983/44766370-16c02200-ab94-11e8-92c9-8bd44bfc6551.png)
- 위 그림에서 target 은 span 을 가리키고,
- currentTarget 은 div 를 가리키게 된다.
