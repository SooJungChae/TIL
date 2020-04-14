# Git tips

#### 파일 변경 이력
```
git log -p <filename>
```

#### 내역 보기
```
최종 파일보기
git show -p <filename>

특정 커밋보기
git show <commitcode>

```

#### 태그 달기
```
git tag -a v0.0 <commitcode>
git tag -a v0.0 f6b2723
```

#### 태그 푸시
```
한개
Git push origin v0.0

전체
git push origin --tags
```

#### .gitignore 없이 로컬에서 ignore 하기
```
지우고 싶은 파일/폴더 입력
vi .git/info/exclude

그래도 사라지지 않는다면 다음 입력
git update-index --asume-unchanged [<file>...]
```

#### 다른 브랜치의 특정 파일만 체크아웃하기
```
git checkout <branch> -- <path>
```

