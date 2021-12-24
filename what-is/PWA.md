# PWA (Progressive Web Apps)
'앱' 같은 '웹'을 사용하는 것처럼 앱 수준의 사용자 경험을 웹에서 제공하는 것.<br/>
앱 수준으로 점차 발전해나가는 웹을 지향한다.

## 특징
- Responsice : 기기와 해상도에 상관이 없어야 한다.
- Connectivity : 서비스워커가 오프라인에서도 동작할 수 있어야 한다.
- App-like-interactions : 앱처럼 반응할 수 있어야 한다 (속도와 모델이)
- Fresh : 최신 컨텐츠를 유지할 수 있는 방법을 갖춰야 한다. (Thanks to the Service Worker update process)
- Safe : https 에서 동작 가능할 것
- Discoverable : search engine 이 찾을 수 있어야 한다.
- Push Notification : 비활성화 상태에서도 푸시 알림을 받아 다시 실행시킬 수 있어야 한다.
- Installable
- Linkable : URL 로 공유가 가능해야 한다.

## Service Worker vs Web Worker vs WebSocket

*Service Worker*

- 브라우저가 백그라운드에서 실행하는 스크립트
- 웹 페이지와는 별개로 작동한다.
- 웹 페이지 또는 사용자 상호작용이 필요하지 않은 기능을 하게 해준다. (푸시알림, 백그라운드 동기화)
- DOM 에 바로 접근할 수 없다.
- Service Wroker 의 `postMessage`인터페이스를 통해 전달된 메세지에 응답하는 방식으로 제어 대상 페이지와 통신할 수 있다.

*Web Worker*
- 멀티스레드처럼 백그라운드에서 스크립트가 돌아갈 수 있도록 해준다. 그래서 돌아가는 동안 다른 스크립트를 막지 않는다.
- UI 응답을 해주면서 프로세서가 돌아갈 수 있게 해준다.
- Web Worker 의 `postMessage`를 통해서만 DOM 에 접근할 수 있다.

*WebSocket*
- 클라이언트와 서버사이에 연결을 하나 생성해서, 양방향 소통을 하게 해준다.
- 챗팅이나, 온라인 개임, 스포츠 시세와 같은 경우에
사용한다.
- WebSocket 의 `send` 메서드를 사용해서 *DOM 에 바로 접근할 수 있다.*

## 참고 사이트
- [따라해보기](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/?hl=ko)
- https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ko
- https://www.samsungsds.com/global/ko/support/insights/pwa1.html
- https://aarontgrogg.com/blog/2015/07/20/the-difference-between-service-workers-web-workers-and-websockets/
