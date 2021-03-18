# git clone 시 timeout 에러 날 때

ssh 로 `git clone` 을 할 때 timeout 에러 나는 경우가 있다.

Bitbucket 에 deploy key 를 추가해줬었는데 
Git 에 있는 리파지토리에 접근했더니 `Key is already in use` 에러가 나오면서 `git clone` 이 불가능했다.

```
ssh: connect to host github.com port 22: Operation timed out
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

## 해결방법
`ssh config` 파일을 수정해주면 된다.
이 파일이 없으면 새로 만들어주고, 았으면 뒤에 추가해주면 된다.

```
> vi config
```
github host 를 추가해준다.
```
Host github.com
  Hostname ssh.github.com
  Port 443
```

`~/.ssh/config` 파일 결과물
```
Host bitbucket.org
  Hostname  altssh.bitbucket.org
  Port  443

Host github.com
  Hostname ssh.github.com
  Port 443
```
 
## 참고
- [GitHub 메시지 Key is already in use, ZETAWIKI](https://zetawiki.com/wiki/GitHub_%EB%A9%94%EC%8B%9C%EC%A7%80_Key_is_already_in_use)
- [갑자기 git 명령이 timeout 날 때, Mr.star](https://lhb0517.tistory.com/entry/%EA%B0%91%EC%9E%90%EA%B8%B0-git-%EB%AA%85%EB%A0%B9%EC%9D%B4-timeout-%EB%82%A0-%EB%95%8C)