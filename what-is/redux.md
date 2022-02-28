# Redux

**Redux is a pattern and library for managing and updating application state, using events called "actions"**

Redux is more useful when:

- You have large amounts of application state that are needed in many places in the app
- The app state is updated frequently over time
- The logic to update that state may be complex
- The app has a medium or large-sized codebase, and might be worked on by many people

## Redux vs Context API

And the only purpose of Context is to act as a dependency injection mechanism scoped to some portion of your subtree,

It’s a dependency injection mechanism, 
and you can put whatever value you want in Context, 
and most often you are the one managing 
that state in a React component, 
with the useState hook or the useReducer hook. 

And you’re the one deciding where the state lives, 
handling how to update it, 
and then putting the value into Context for distribution.

So yeah, useReducer plus useContext together kind of make up a state management system.

And that one is more equivalent to what Redux does with React, 
but Context by itself is not a state management system.

TODO: https://redux.js.org/tutorials/essentials/part-1-overview-concepts#immutability
