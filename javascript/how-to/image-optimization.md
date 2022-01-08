# 이미지 최적화

Next.js 프레임워크로 알림함 화면 개발을 하다가
매우 작은 이미지인데도 로드가 느린걸 발견했다.

Next.js 에서는 기본적으로 빌트인 이미지 최적화 API 를사용하기 때문에
이미지 파일에 접근하면 Next.js 웹 서버에서 바로 쏴준다.

만약, CDN 이나 외부 이미지 서버에서 바로 이용하려면 built-in loader 를 사용해도 되고,
자바스크립트 코드를 몇줄 추가해도 된다.

> LCP(Largest Contentful Paint)
> 최대 콘텐츠풀 페인트(LCP)는 페이지의 메인 콘텐츠가 로드되었을 가능성이 있을 때 페이지 로드 타임라인에 해당 시점을 표시하므로 사용자가 감지하는 로드 속도를 측정할 수 있는 중요한 사용자 중심 메트릭입니다. LCP가 빠르면 사용자가 해당 페이지를 사용할 수 있다고 인지하는 데 도움이 됩니다.
> - https://web.dev/lcp/#what-elements-are-considered

 페이지가 처음으로 로드를 시작한 시점을 기준으로 
 뷰포트 내에 있는 가장 큰 이미지 또는 텍스트 블록의 렌더링 시간을 보고한다.
 
 가장 좋은건 2.5초 이하여야 한다.
 
 
 priority 속성을 추가해야 한다. 이 속성은 Next.js 가 이미지 로딩을 할 때 우선순위를 지정해서 LCP 속도를 빠르게 한다.
 
 layout 변형이 일어나게 되면 이미지가 성능에 크게 영향을 미치게 된다. 이미지가 로드되면서 주변 요소들을 옆으로 밀어내면서 (CLS)
 
 > Cumulative Layout Shift(누적 레이아웃 이동, CLS)
> 누적 레이아웃 이동(CLS)은 사용자가 예상치 못한 레이아웃 이동을 경험하는 빈도를 수량화하므로 시각적 안정성을 측정할 때 중요한 사용자 중심 메트릭입니다. CLS가 낮으면 우수한 사용자 경험을 보장하는 데 도움이 됩니다

우수한 사용자 경험을 제공하기 위해선 CLS 점수가 0.1 이하여야 한다. 75번째 백분위수를 측정하는 것이 바람직한 임계값이다. 
 
 - https://web.dev/cls/
  

LCP 요소가 lazy-loaded 이미지라면 `loading` 속성을 제거해야 한다. 
 
 ## LCP
 
 
 > FCP(First Contentful Paint)
 
 
 이미지 최적화 방법
 
 - 올바른 이미지 format 사용하기
 - 최적화 
 - 
 - video 대신 GIF 로 대체하기
 - 반응형 이미지 
    - before: `<img src="flower-large.jpg">`
    - after: `<img src="flower-large.jpg" srcset="flower-small.jpg 480w, flower-large.jpg 1080w" sizes="50vw">`
    - srcset 에 w 를 지정해주면 브라우저가 다운로드 받아서 확인할 필요없이 해당 화면에 알맞은 사이즈를 바로 다운받게 된다.
       
 - 이미지 올바른 크기
 - WebP 이미지 사용
    - jpeg, png 보다 25-35% 작다.
    
 - 최적화를 위해 CDN 사용하기
 
 - https://web.dev/fast/#optimize-your-images
 
