# lazy loading

화면에 늦게 떠서 사용자 나가는걸 방지할 수 있다.

## lazy loading images
`<img>` 태그 요소들에 사용하면 된다.

### browser-level lazy-loading

### Intersection Observer

- 감시하고자 하는 다른 요소(viewport)에 **들어가거나 나갈 때** 또는 **요청한 부분만큼 두 요소의 교차부분이 변경될 때**마다 
실행될 콜백 함수를 등록할 수 있다.
- **root:** 타겟을 지켜볼 observer. 타겟 객체의 조상 요소여야 한다. (`null` 이면 `root(document)`)
- **rootMargin:** observer 의 영역을 변경할 수 있다. [참고) The Intersection Observer API](https://blog.arnellebalane.com/the-intersection-observer-api-d441be0b088d) 
- observer 를 만들면 지켜볼 타겟을 알려줘야 한다.
```js
const observer = new IntersectionObserver(callback, options);
observer.observe(targetElement);
```
- target 이 threshold 를 만족하면 callback 이 호출된다.
- callback 은 메인 스레드에서 실행된다.
- 어떻게 교차를 감지할까? 네모난 구역을 만들어 intersection 을 감지한다.
- **Demo:** https://codepen.io/naanace/pen/wvrXNWM
- **참고:** https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver

### scroll and resize event handlers



## 출처
- [lazy loading ](https://web.dev/lazy-loading-images/) 