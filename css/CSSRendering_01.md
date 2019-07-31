# 그래픽스 시스템
점 찍는 방법

## Fixed Number 에서 Abstract calculator 시스템으로 노출된다

framework html 체계 전체. (Bootstrap, html 시스템)
components (html) html 태그 하나하나를 컴포넌트라 본다. radio button, div ...

# 렌더링 시스템
- 1단계 : 박스를 찾는다. Geometry calculate -> Reflow
- 2단계 : 색칠을 한다. Fragment fill 같은 영역을 채운다. -> Repaint

----

CSS 란,
- 땅따먹기한 공간에(Fragment) 스타일을 적용하는 것
- % 와 px 은 쉬운데 그걸로 표현하기 어려운 것들을 추상적으로 계산하는 다양한 방법들이 있다.

W3C
- CSS 레벨 1 : 한장짜리 매우 간단한 스펙이었음.
- CSS 레벨 2 : MS 등 회사에서 뛰어들음. 다양한 IE6 호환. + `MODULE`화 됨 (윈도우의 렌더링 시스템, 맥의 렌더링 시스템... 너무 많으니까 사양을 쪼개서 관리하게 되었음)
- CSS 레벨 2.1 :

