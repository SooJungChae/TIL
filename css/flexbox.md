# css의 FlexBox모델. 와 신세계다!
[https://www.vobour.com/1-flexbox-%EC%9D%B4%ED%95%B4-%EB%8B%B9%EC%8B%A0%EC%9D%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-%EB%AA%A8%EB%93%A0-%EA%B2%83-understa](https://www.vobour.com/1-flexbox-%EC%9D%B4%ED%95%B4-%EB%8B%B9%EC%8B%A0%EC%9D%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-%EB%AA%A8%EB%93%A0-%EA%B2%83-understa)
[https://joshuajangblog.wordpress.com/2016/09/19/learn-css-flexbox-in-3mins/](https://joshuajangblog.wordpress.com/2016/09/19/learn-css-flexbox-in-3mins/)

- ul, li 가 있다고 하자.
- ul 는 부모. li 는 자식이다.
- 부모는 flex-container 라 하고
- 자식은 flex-items 라 한다.
- flex 는 부모에게 줘야한다. `ul { display:flex; }`

## flex : 부모 속성
- flex-direction : row / column 방향
- flex-wrap : 기본값은 no-wrap. 컨텐츠가 계속 추가됨에 따라 다음줄로 바꿀 건지
- flex-flow :  { direction | wrap } 한 줄에 적을 수 있다.

## justify-content : 부모에서 정의하는 items 들에 대한 '가로' 정렬 방식
- flex-start : 왼쪽 정렬
- flex-end : 오른쪽 정렬
- flex-center : 가운데 정렬
- space-between : 동일 간격 정렬
- space-around : 동일 여백 정렬 (margin left,right 가 같다고 할까)

## align-items : 부모에서 정의하는 items 들에 대한 '세로' 정렬 방식
- stretch : height 꽉 채우기
- flex-start : 상단 정렬
- flex-end : 하단 정렬
- flex-center : 가운데 정렬
- base-line : 글자 기준 상단 정렬

## align-content : 많은 컨텐츠가 추가되었을 때 '세로' 로 어떻게 정렬할지
- stretch : height 꽉 채우기
- flex-start : 상단 정렬
- flex-end : 하단 정렬
- flex-center : 가운데 정렬


