## React Admin Architecture summary

### DataProvider

**interface that the model must expose via its Providers.**

So react-admin uses the Adapter pattern to let developers plug their backends in. The idea is that react-admin defines an interface to interacts with data, authentication, and internationalization. **You must provide an object that satisfies this interface.** How that translates to actual HTTP calls is up to you.

We try to **avoid** as much as possible having components **accepting a huge number of props**(we call these “God Components”). Instead, we **use composition: complex components accept subcomponents that handle a large share of the logic.**

This allows overriding only part of the logic of a component by composing it with another component.

The drawback is that react-admin sometimes forces you to override several components just to enable one feature.

---

React-admin makes heavy use of React contexts. **Whenever a component creates data or callbacks, it makes them available to descendants via a context.**

So when a component needs to access data or callbacks defined higher in the render tree, **it can always find the context to get it.**

For instance, `useRecordContext` hook to grab the current record value:

```js
import { ShowButton } from 'react-admin';

const CommentShowButton = ({ record }) => (
    <ShowButton basePath="/comments" label="Show comment" record={record} />);
```

```js

import { ShowButton, userecordContext } from 'react-admin';

const CommentShowButton = () => {
    const record = useRecordContext();
    return (
        <ShowButton basePath="/comments" label="Show comment" record={record} />);
};
```

**React-admin contexts aren’t exposed directly. Instead, react-admin exposes hooks to access the context content.**

hooks hide the implementation details of the framework, so that you can focus on the business logic.

So hooks are the primary way to read and change a react-admin application state.

---

### State management

React-admin uses [Redux](https://react-redux.js.org/) for some of its state management

Similarly, react-admin supports redux-saga for side effects with Redux. **But the sagas registered at startup are only there for backward compatibility reasons, and no new feature use sagas. Instead, we use hooks.**

Previous versions of react-admin used to put a greater emphasis on Redux and redux-saga. It’s no longer the case, and we even consider that we could remove Redux completely in the future - if React ever implements Context selectors.

---

We prefer to keep the react-admin API, code, test, and documentation simple.

[https://marmelab.com/react-admin/Architecture.html](https://marmelab.com/react-admin/Architecture.html)

---

### How to pass props

The entry point for this view is the `<List>` component, which takes care of fetching the data. Then, it puts that data in a ListContext so that it’s available for its descendants - usually `<Datagrid>`, which then delegates the rendering of each record property to `<Field>` components.

A `Field` component displays a given property of a REST resource

`Field` components read the current `record` from the current `RecordContext`(set by react-admin).

React-admin Field components also accept a `record` prop. This allows you to use them outside a `RecordContext`, or to use another `record` than the one in the current context.

```js
// a post looks like
// { id: 123, title: "Hello, world", author: "John Doe", body: "..." }

const PostShow = ({ id }) => {
    const { data, loaded } = useGetOne('books', id);
    if (!loaded) return <span>Loading</span>;
    return (
        <dl>
            <dt>Title</dt>
            <dd><TextField record={data} source="title" /></dd>
            <dt>Author</dt>
            <dd><PurpleTextField record={data} source="author" /></dd>
        </dl>);
}
```

`<Resource>`also creates a ResourceContext, that gives access to the current resource name to all descendents of the main page components (`list`, `create`, `edit`, `show`).

to read the current resource name, use the `useResourceContext()` hook.

```js
const ResourceName = () => {
    const { resource } = useResourceContext();
    return <>{resource}</>;
}
```

### Routing

the `<Resource>` component uses [react-router](https://reactrouter.com/web/guides/quick-start) to create several routes:

By default, react-admin creates URLs using a hash sign (e.g. “myadmin.acme.com/#/posts/123”). The hash portion of the URL (i.e. `#/posts/123` in the example) contains the main application route.

### Querying the API
`useQuery`, `useMutation` and `useDataProvider` are “the react-admin way” to query the API, but nothing prevents you from using `fetch` if you want. For instance, **when you don’t want to add some routing logic to the data provider for an RPC method on your API, that makes perfect sense.**

[https://marmelab.com/react-admin/Actions.html#querying-the-api-with-fetch](https://marmelab.com/react-admin/Actions.html#querying-the-api-with-fetch)
