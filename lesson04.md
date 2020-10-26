# 04 - Lesson Four: Redux and Redux-Saga #

## Why Redux ##
There is a big debate that [Redux is dead](https://medium.com/rexlabs/redux-is-dead-long-live-redux-745d0cb26423), and that you can replace them with Context + Hooks,  and with [async rendering](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html).  
As well there are [other opinions](https://blog.isquaredsoftware.com/2018/03/redux-not-dead-yet/), which says the opposite, that Redux still has values that are not provided by all these new features.  
Although I admit that you can build your own **State Management** and hook it up with **`React Context`** and **`hooks`**, but I am leaning to use Redux because I am in love with two other libraries that are built-on redux:

1. [redux-saga](https://redux-saga.js.org/)
2. [reselect](https://github.com/reduxjs/reselect)

I know you can find alternatives (maybe) for both with the new way (context+hooks), but maybe I am lazy to learn to do the same thing in different way, and beside that, the new react-redux library is using the hooks, so at the end the footprint of adding the new redux will be very small.  
I will add later a section where I can show how to replace redux with hooks and context.

## Redux-Saga and ReSelect ##
Redux-saga is a library to manage side-effects, and async calls in the code. But its design allow you to build elegant workflow for your application, and write unit test for them.  
ReSelect is a library to build compute data based on the data from redux. It helps reduce the size of redux, and it cache its data, so it saves the time of recalculate the computing process.

## Setup Redux ##

install redux:

```sh
npm i redux react-redux react-router-redux redux-saga reselect
```


