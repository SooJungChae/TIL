# iis7 에 node 프로젝트 배포하기

[https://github.com/tjanczuk/iisnode](https://github.com/tjanczuk/iisnode)
링크를 따라 환경을 만들어준다.

- Windows Vista, Windows 7, Windows 8, Windows Server 2008, or Windows Server 2012
- IIS 7.x with IIS Management Tools and ASP.NET
- WebSocket functionality requires IIS 8.x on Windows 8 or Windows Server 2012
- **URL rewrite module for IIS**
- **Latest node.js build for Windows**

iis7 에서 작업하는거니 다음을 실행하여 테스트해준다. (다운로드 링크는 위 링크를 참조)
- Install iisnode for IIS 7.x/8.x: x86 or x64 - choose bitness matching your system
- To set up samples, from the administrative command prompt call %programfiles%\iisnode\setupsamples.bat
- Go to http://localhost/node

------
여기까지 하면 다 잘 되나보다. 역시 에러가 안나면 심심하지~
iis관리자 페이지에서 8008 포트에 새 사이트를 만들고 시작했는데 403.14 에러 발생

```
HTTP 오류 403.14 - Forbidden
웹 서버가 이 디렉터리의 내용을 표시하지 못하도록 구성되었습니다.
```

아니 근데, 디렉토리내용은 표시할 필요가 없지 않나? web.config 파일을 못 읽는 듯함... 플러그인 작업하고 다시 오자~
