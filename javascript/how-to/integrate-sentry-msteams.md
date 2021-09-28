webhook

웹훅은 sentry 를 추가한 서비스에서  이슈, 알럿, 배포 등 이벤트가 발생하면 원하는 서비스에 전달할 수 있는 기능이다.

주로 프론트에서 필요할 때 서버로 API호출을 하는데, 웹훅은 서버에서 클라이언트로 반대로 전달을 하는 걸 말한다.

sentry 와 Microsoft teams 에서 무료로 연결하는 방법을 알아보자.

ms teams 에는 connections 이라는게 존재한다.

https://sentry.io/settings/wmpo-pos/developer-settings/wmpo-pos-webhook-425f5a/

프로젝트 > developer setting 에 가보면 Webhook URL 을 설정할 수 있다.

모든 웹훅들이 이 URL 로 전송되게 된다.

sentry.io 페이지는 UI 만 보여주는 곳이기 때문에 sentry 이벤트가 발생했을 때 자동으로 팀즈에 보낼 수 있을 거라 생각했다.

https://github.com/getsentry/sentry/issues/14502
이 링크를 참고해보면 터미널에서 webhook 이 보내진 걸 볼 수 있다. 팀즈에서도 볼 수 있을 것이다.

팀즈에서 connector 란, 인입되는 웹훅으로 외부 서비스가 알림을 호출할 수 있게 하는 것이다. 받은 정보로 원하는 작업을 할 수 있다. 

이 커넥트를 이용하려면 [office 365 커넥터 포맷](https://docs.microsoft.com/en-us/outlook/actionable-messages/message-card-reference)에 맞게 sentry 에서 셋팅을 좀 해야한다.

sentry 에서 오류가 발생하면 특정 URL 로 잘 가는지 확인해보자.

[requestbin](https://requestbin.com/) 에서 웹훅을 받을 곳을 만든다.

workflow 를 만들면 웹훅을 받을 url 이 생긴다.

sentry 웹훅이 잘 보내지는지 테스트해보자.

sentry 에서 settings > 프로젝트 > Legacy Integrations > Integration Details 로 가서 requestbin 의 url 을 넣고 `Test Plugin` 을 클릭해서 테스트해보면 잘 들어오는 걸 볼 수 있다.

결국, teams 에서도 잘 들어오는데 아무 반응이 없다는 건 teams 에서 받을 수 있는 형식이 다르다는 것이다.

[temas 의 webhook 문서](https://docs.microsoft.com/en-us/outlook/actionable-messages/message-card-reference)를 보고 Sentry 에서 받는 webhook 형식을 바꿔줘야 한다.

pipedream 에서 `edit code and configuration` 을 치면 형식을 수정할 수 있다.

(pipedream 이 중개자 역할인가 보다.)

cURL 도 있지만 pipedream 이 더 쿨한듯...
내일 다시 해야지~






sentry 에서 어떻게 셋팅을 해야할까?