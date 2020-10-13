# string 에서 일치하는 것 중 n 번째 가져오기
## indexOf, split
```javascript
var a = "010-2222-3333";
a.indexOf("-"); // 3

function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

getPosition(a, "-", 2); // 8
```

### 날짜 오래된 순으로 정렬
```js
// https://redux.js.org/tutorials/essentials/part-4-using-data#creating-a-single-post-page
const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
```

### object 를 도는데 순서가 상관없다면 `Object.entries()`
```js
// https://redux.js.org/tutorials/essentials/part-4-using-data#creating-a-single-post-page
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

// 순서 정렬이 필요하다면 sort 를 해줘야 한다.
// Object.entries(reactionEmoji).sort((a, b) => b[0].localeCompare(a[0]))
const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" className="muted-button reaction-button">
        {emoji} {post.reactions[name]}
      </button>
    )
  })
```

