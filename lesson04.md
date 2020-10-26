# 04 - Lesson Four: Redux and Redux-Saga

## Why Redux ##
There is a big debate that [Redux is dead](https://medium.com/rexlabs/redux-is-dead-long-live-redux-745d0cb26423), and that you can replace them with Context + Reducer hook,  and with [async rendering](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html).  
As well there are [other opinions](https://blog.isquaredsoftware.com/2018/03/redux-not-dead-yet/), which says the opposite, that Redux still has values that are not provided by all these new features.  
First, let us consider why we need redux. If your application is not complex, and you don't need a complex state management, then you don't need redux. If your application only fetching and updating data, then [Apollo](https://www.apollographql.com/docs/react/) will be a good fit.  

For more on why you should use redux, [refer to this](https://redux.js.org/faq/general#when-should-i-use-redux).  

Although I admit that you can build your own **State Management** and hook it up with [React Context](https://reactjs.org/docs/hooks-reference.html#usecontext) and [reducer hooks](https://reactjs.org/docs/hooks-reference.html#usereducer).  
But if you anticipate some complexity in state management, then Redux will provides architecture guidance on how to build your application, specially when you combine it with redux-saga that I will talk about it.  
I am leaning to use Redux because there is one good feature in redux, and there are two other libraries that I found them extremley handy, and they are built-on redux:

1. [redux integration with react-router](https://redux.js.org/advanced/usage-with-react-router)
1. [redux-saga](https://redux-saga.js.org/)
2. [reselect](https://github.com/reduxjs/reselect)


I know you can find alternatives (maybe) for all these features in the new way (context+hooks), but maybe I am lazy to learn again, to do the same thing in different way, and beside that, the new react-redux library is using the hooks, so at the end the footprint of adding the new redux will be very small.  
I will add later a section where I can show how to replace redux with hooks and context.

## Redux-Saga and ReSelect ##
Redux-saga is a library to manage side-effects, and async calls in the code. But its design allow you to build elegant workflow for your application, and write unit test for them.  
ReSelect is a library to build compute data based on the data from redux. It helps reduce the size of redux, and it cache its data, so it saves the time of recalculate the computing process.

## Setup Redux ##

The new redux version comes with a helper library that implements the best practices of redux, which is [redux-toolkit](https://redux-toolkit.js.org/).  
Redux-toolkit alreadys has redux and reselect, so we need to add it and add redux-saga and react-redux.  

install redux:

```sh
npm i @reduxjs/toolkit react-redux redux-saga
```
create a folder called 'redux' and add a file called 'store.ts'

```js
// file redux/store.ts
const store = configureStore({
  reducer: 
})
```

