# Next.js

Next.js 는 배포를 위한 기능을 담은 "리액트 프레임워크" 이다.

즉, React 와 Next.js 는 다르다.

react, vue 같은 경우 **데이터를 제외**한 화면을 그리는 코드들이 프론트 서버에서 다운받아진다.
이때 js 파일에 한번에 번들되어 오기 때문에 다운받는데 시간이 걸린다. (code splitting 기능으로 어느정도 해결 가능하다)
하지만 다 다운을 받고 나면 그 이후부터는 필요한 데이터만 갱신되기 때문에 서버 부하가 덜한 CSR 방식이다. 
하지만 CSR 방식은 빈 html 이 오기 때문에 SEO에 최적화되지 않는다는 문제가 있다. (똑똑이 크롬은 제외)

이러한 문제를 해결하기 위해 나온 게 Next.js 이다.

초반에는 서버에서 렌더링 된 html 파일을 다운받고, 그 이후에 데이터 변경의 경우 같이 다운받아 진 javascript 파일에서 처리된다.
**Next.js 는 SSR + CSR 방식이다.**   

## Next.js SSR + CSR 원리 

Next.js 에서 라우팅은 page 로 제공된다. page 폴더 안에 파일을 작성하면 .js, .jsx, .ts, .tsx 로 리액트 컴포넌트가 생성된다.
getServerSideProps 함수가 있다면 페이지를 SSR 으로 그려준다.

Next.js 에서는 이 모든 페이지를 pre-render 한다. 결국 화면을 서버에서 그려주는 SSR 을 진행한다. 
각각 만들어진 HTML 은 최소한으로 연관된 javascript 코드를 갖게 된다. 
브라우저가 페이지를 호출하면 javascript 코드가 실행되면서 화면이 동작하게 된다. (이 과정을 hydration) 이라고 한다.
그래서 Next.js 에서는 SSR + CSR 둘다 가능하다.

pre-rendering 방식은 두가지 방법을 제공하며 두 가지 방법 모두 사용할 수 있다.

- Static Generation (추천) : HTML 이 build time 에 생성되고, 페이지가 요청 될때마다 재사용된다.
- Server Side Rendering : HTML 이 요청될 때마다 생성된다.
 
**공식 홈페이지에서는 Static Generation 을 추천한다.** CDN 에 캐시되기 때문이다.

## Static Generation

build time 에 페이지가 생성된다. 이때 데이터를 제공하거나 제공하지 않을 수도 있다.

without data
```js
function About() {
  return <div>About</div>
}

export default About
```

with data
```js
// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export default Blog
```

이 경우, 페이지를 렌더링 하기 위해선 posts 데이터가 필요하다. pre-render 되는 시점에 데이터를 page props 에 보낼 수 있다.

같은 파일 하단에 이렇게 적어주면 된다.
```js
// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

만약 dynamic route 인 경우, `getStaticpaths` 를 사용하면 된다.

```js
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
```

dynamic route 에서 사용된 데이터가 필요한 경우
`getStaticPaths` 와 `getStaticProps` 를 같이 사용하면 된다.

```js
function Post({ post }) {
  // Render post...
}

export async function getStaticPaths() {
  // ...
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export default Post
```

## SSR

```js
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page
```
Static Generation 과 비슷하지만  `getServerSideProp` 를 쓴다는 점이 다르다. 
`getServerSideProp` 는 빌드 시간에 실행되지 않고 매번 요청될 때마다 실행된다. 그러니 진짜 필요할 때만 쓰도록 하자.

## 우리 프로젝트에서는 어떤 걸 사용해야할까?

"사용자가 요청하기 전에 페이지가 미리 렌더링 될 수 있을까?" 를 고민한다면 
Static Generation (+ Client Side Rendering)을 사용하면 된다.

SSR 은 저엉----말 필요할 때만 .. 쓰도록 한다. 

만약 페이지에 배우 빈번하게 데이터 없데이트 되는 데이터가 있다면 pre-render 할 필요는 없고, client side 에서 데이터를 요청하면 된다.
예를 들어, user 대시보드 같이 개개인용으로 사용자 중심적 페이지라면 SEO 는 필요없으니까 pre-render 될 필요는 없다.

client side 에서 데이터를 전송한다면 `SWR` 을 사용해서 요청하는 걸 고려해보자. 이건 Next.js 팀이 만든
React hook 이다. caching, revalidation, focus tracking 등 많은 이점이 있다.

```js
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```
 

## 출처
- https://nextjs.org/docs/basic-features/pages
- https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side
- https://www.sarah-note.com/%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9/posting2/
