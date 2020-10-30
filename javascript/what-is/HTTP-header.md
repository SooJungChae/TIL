# HTTP header
# HTTP Content-type 

서버에 데이터를 보낼 때 어떤 형식의 데이터를 보낼지 Content-Type 에 작성한다. 이때 사용하는 Content-Type 에는 주로 3가지가 있다. 

- `multipart/form-data`, 
- `application/x-www-form-urlencoded`, 
- `application/json`

### `form-data`
파일이나 이미지 같은 '글자' 가 아닌 데이터, 즉 바이너리 파일을 저장할 때 사용한다.
크기가 큰 파일을 전송할 때 사용하는 타입인데 작은 것도 상관없다고 한다. 특징이 있다면 데이터를 보낼 때 컨텐츠 영역뒤에 `boundary` 키가 붙는다는 것이다. 
이 키값으로 보낸 데이터를 구분짓는다. 

**Request header**
```
Content-Type: multipart/form-data; boundary={boundary string}
```

**Request Body**
```
--{boundary string}
Content-Disposition: form-data; name="username",

soo
--{boundary string}
Content-Disposition: form-data; name="country",

kr
--{boundary string}
Content-Disposition: form-data; name="file"; filename="image.jpg"
Content-Type: image/jpeg,

--{boundary string}--
```

`boundary` 가 붙어서 가니 서버에서는 데이터를 읽을 때 따로 파싱작업이 필요하다. 
사용할 수 있는 라이브러리는 [busBoy](https://github.com/mscdex/busboy) 나 [formidable](https://github.com/node-formidable/formidable) 이 있다.   


### `x-www-form-urlencoded`
`=`, `&` 를 사용해 데이터의 key, value 를 구분한다. 데이터 전송할 때 브라우저에서 자동으로 `key=value&key=value`형식으로 인코딩을 해준다.
이때 특수한 기호같은 경우는 `%HH` 라는 문자를 붙여 1byte 를 3byte 로 만들기 때문에 `form-data` 보다는 비효율적이다.
사용하는 이유는 간단히 표현할 수 있어서 인 것 같다.

**Request header**
```
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
```

옆에 붙은 `charset=UTF-8` 은 데이터를 어떤 형식으로 인코딩할지를 나타낸다.

**Request Body**
```
username=soo&country=kr
``` 

* 요청을 보낼 때 `form-data` 는 `formData` 형식이고, `x-www-form-urlencoded` 는 `urlSearchParam` 형식이다.
 
찾아보면서 이 둘을 언제 사용해야 하나 구분하려니 헷갈렸다. 
[어떤 글](https://dev.to/getd/x-www-form-urlencoded-or-form-data-explained-in-2-mins-5hk6) 에서 보니 `multipart` 를 `.html` 이라 생각하고 `form-urlencoded` 를 `.txt` 파일이라 생각하면 된다고 했다.
으흠..? 

## json (TODO)

## 참고
- [application/x-www-form-urlencoded or multipart/form-data? - StackOverflow](https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data)
- ['x-www-form-urlencoded' or 'form-data' 😵 ? Explained in 2 mins. - TechBos](https://dev.to/getd/x-www-form-urlencoded-or-form-data-explained-in-2-mins-5hk6) --> 이 페이지가 제일 도움이 됐다.
    
