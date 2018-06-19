# 글씨 크기
- 헤더 크기는 6까지만 지원한다.
# Header 1 #
## Header 2 ##
### Header 3 ###
#### Header 4 ####
##### Header 5 #####
###### Header 6 ######
```
# Header 1 #
## Header 2 ##
### Header 3 ###
#### Header 4 ####
##### Header 5 #####
###### Header 6 ######
```
- 제목, 부제목을 사용할 경우 다음을 사용한다.
- =, - 하나씩만 사용해도 되지만 가독성을 위해 여러개 붙이는 걸 추천한다.

제목
=
부제목
-
```
제목
====
부제목
-----
```
# 글씨 스타일

- 기울이기

*기울이기*
```
*기울이기*
_기울이기_
```

- 볼드체
**볼드체**
```
**볼드체**
__볼드체__
```

- 기울이기 + 볼드체

**_기울이기+볼드체_++
```
**_기울이기+볼드체_++
```


~~취소선~~
```
~~취소선~~
```


# 리스트
- 하나
- 둘
- 셋
```
- 하나
- 둘
- 셋
```

# 줄 추가 (수평선)
- 다음을 3개이상 사용한다.

***
---
___
```
***
---
___
```

# 상태 아이콘 넣기
- [이 링크를 참고한다.](https://shields.io/)
![image](https://user-images.githubusercontent.com/12723983/40457622-8705b34e-5f32-11e8-8f25-79c787021c8e.png)
- 원하는 걸 클릭하면 해당 아이콘의 documentation 이 뜨고, Markdown 부분을 사용하면 된다.

![Coveralls bitbucket](https://img.shields.io/coveralls/bitbucket/pyKLIP/pyklip.svg)
![continuousphp](https://img.shields.io/continuousphp/git-hub/doctrine/dbal/master.svg)

```
![Coveralls bitbucket](https://img.shields.io/coveralls/bitbucket/pyKLIP/pyklip.svg)
![continuousphp](https://img.shields.io/continuousphp/git-hub/doctrine/dbal/master.svg)
```

# 외부 링크 걸기
형식은 이렇다. `[링크텍스트](실제url)`<br/>
[채라스틴 블로그](https://blog.naver.com/naan_ace)

```
[채라스틴 블로그](https://blog.naver.com/naan_ace)
```

# 본문 내에 링크 걸기
일반 링크거는 것과 비슷하다. 본문에서는 헤더태그(#)가 있는 곳에서 참조가 가능하다. <br/>
'#' 과 함께 헤더 텍스트를 넣어주면 된다.<br/>
공백이 있다면 `-`로 넣어줘야 한다.

[이미지정렬 링크로~](#이미지-정렬)

```
[이미지정렬 링크로~](#이미지-정렬)
```


# 이미지 삽입
- 이미지를 따로 저장 안하고 업로드 하는 방법이 있다.
1) 그림판 같은 이미지 편집 툴에서 이미지를 복사한 후(Ctrl+C),
<img src="https://user-images.githubusercontent.com/12723983/40458307-4e684246-5f36-11e8-9b60-9212a525ad52.png" alt="그림판에서 복사한 후" width="50%">

2) github issue 창으로 가서 새 issue 를 클릭하고 Write 부분에 이미지를 붙여넣는다(Ctrl+V). 그럼 다음과 같이 url 이 생기는데
<img src="https://user-images.githubusercontent.com/12723983/40457693-d417b07e-5f32-11e8-8931-bb91955f6c63.png" alt="issue write 에서 붙여넣기" width="50%">

3) 이걸 다음처럼 github 문서에서 사용하면 된다.
![해피](https://user-images.githubusercontent.com/12723983/40457831-aa587132-5f33-11e8-94e9-7e0b487e5259.png)

```
![해피](https://user-images.githubusercontent.com/12723983/40457831-aa587132-5f33-11e8-94e9-7e0b487e5259.png)
```

# 이미지 사이즈 조절
- jekyll 테마를 쓰는 사람과 github 자체만으로 사용하는 사람의 스타일 지정 방법이 다르다.
- 테마를 쓴다면 style 태그를 지정해주면 된다. 
```![해피](https://user-images.githubusercontent.com/12723983/40457831-aa587132-5f33-11e8-94e9-7e0b487e5259.png){:width=100 height=100}```
- 하지만, github 자체에서 이미지 사이즈를 지정해주고 싶다면 html 태그를 사용해서 width, height 를 지정해줘야 한다.
```<img src="경로" alt="설명" width="사이즈" height="사이즈">```
- width, height 를 지정해줄 수 있는데 px, % 둘다 상관없다.
- 숫자 뒤에 px 을 안 붙이면 자동 px 이 된다.
<img src="https://user-images.githubusercontent.com/12723983/40457831-aa587132-5f33-11e8-94e9-7e0b487e5259.png" alt="issue write 에서 붙여넣기" width="50%">

```
<img src="https://user-images.githubusercontent.com/12723983/40457831-aa587132-5f33-11e8-94e9-7e0b487e5259.png" alt="issue write 에서 붙여넣기" width="50%">
```

# 이미지 정렬
- html 태그의 align 속성으로 왼쪽, 가운데, 오른쪽 정렬을 할 수 있다.
- 가운데 정렬은 p 로 감싸주고 p 태그에 align 을 넣어준다.

`left` 정렬
<img align="left" src="https://user-images.githubusercontent.com/12723983/40458597-c2edd968-5f37-11e8-854d-9b4740747e1f.png" alt="왼쪽 정렬" width="100">

```
<img align="left" src="https://user-images.githubusercontent.com/12723983/40458597-c2edd968-5f37-11e8-854d-9b4740747e1f.png" alt="왼쪽 정렬" width="100">
```

---

`center` 정렬

<p align="center">
<img src="https://user-images.githubusercontent.com/12723983/40458597-c2edd968-5f37-11e8-854d-9b4740747e1f.png" alt="중간 정렬" width="100">
</p>

```
<p align="center">
<img src="https://user-images.githubusercontent.com/12723983/40458597-c2edd968-5f37-11e8-854d-9b4740747e1f.png" alt="중간 정렬" width="100">
</p>
```

---

`right` 정렬

<img align="right" src="https://user-images.githubusercontent.com/12723983/40458597-c2edd968-5f37-11e8-854d-9b4740747e1f.png" alt="오른쪽 정렬" width="100">

```
<img align="right" src="https://user-images.githubusercontent.com/12723983/40458597-c2edd968-5f37-11e8-854d-9b4740747e1f.png" alt="오른쪽 정렬" width="100">
```

---

