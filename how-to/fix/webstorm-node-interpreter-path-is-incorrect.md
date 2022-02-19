## Situation

Node interpreter path broken after install macOS version to "Big Sur".

## Reason

- node simlink might be broken even /usr/local/bin `node` package exist. You can check it with `cd /usr/local/bin && ls -al | grep node`

## Solution

### Node install

**1. link node again**
- Try `ln -s "$(which node)" /usr/local/bin/node` but it's not work. 

https://intellij-support.jetbrains.com/hc/en-us/community/posts/360008275400-Node-Interpreter-node-No-executable-found-in-PATH-

**2. Delete node and reinstall it**
- Delete node simlink `/usr/local/bin > rm node`
- Reinstall node (https://nodejs.org/ko/download/)

### Set node path in preference
- `File | Settings | Languages and Frameworks | Node.js`
- Set node interpreter path

https://www.jetbrains.com/help/idea/node-js-interpreters.html
