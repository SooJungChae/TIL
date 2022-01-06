```
(master) git fetch origin
(master) git checkout bugfix/WMPO-7295
```

```
 ~/dev/web.wmpo   bugfix/WMPO-7295  git remote show origin | grep 7295
    bugfix/WMPO-7295      tracked
    bugfix/WMPO-7295      merges with remote bugfix/WMPO-7295
    bugfix/WMPO-7295  pushes to bugfix/WMPO-7295  (up to date)

```

tracking 대상을 다른 브랜치로 지정할 수 있다.

```
(master) git fetch origin
(master) git checkout -b WMPO-7295 --track origin/master
```

```
 ~/dev/web.wmpo   WMPO-7295  git remote show origin | grep 7295             
    bugfix/WMPO-7295             merges with remote master
```