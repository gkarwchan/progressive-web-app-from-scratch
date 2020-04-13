# 01 - webpack and typescript

This lesson will introduce webpack and TypeScript.


## Initialize the project ##
Create a directory with the name of the project, inside the directory intialize the npm:
```sh
mkdir myapp
cd myapp
npm init -y
```
  

Add `.gitignore` file and the following into it.  

```sh
.DS_Store
*.log
node_modules/
```

 

## TypeScript:
TypeScript is a superset of javascript that compiles to plain JavaScript.


#### Setup TypeScript:

```sh
npm i --save-dev typescript
```
We need to configure TypeScript in the local folder. Create a file names `tsconfig.json`

```json
// file tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "module": "es6",
    "target": "es6",
    "jsx": "react",
    "allowJs": true
  }
}
```
Without `tsconfig.json` file, TypeScript compiler will run on its default configuration.  
To modify the settings it is easier to create this file instead of passing those parameters on the command line.  
In the previous settings we define this:  

* noImplicitAny: as we are having more strict definitions of types, with this option, we are going very strict and says that we have to inforce the types, otherwise it will raise error.
* module: If you are targeting ES5 or lower then use `CommonJS`, otherwise you can use `ES6`.  


Let us see typescript in action. Create a folder called src, and add two files into it: person.ts, and index.ts.
Add the following code:

```typescript
// person.ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    return `My name is ${this.name}`;
  }
}

export default Person;
```

and in `index.ts` add this:
```typescript
// index.ts
import Person from './Person';

function component() {
  var element = document.createElement('div');
  var person = new Person('John');
  element.innerHTML = `Hello, ${person.sayHello()}`;

  return element;
}

document.body.appendChild(component());
```


Now let us run typescript compiler to have a sense of what it is doing:  

```sh
./node_modules/.bin/tsc
```

this will generate two files in the folder `dist`.  


## Webpack ##

Webpack is the bundling tool, that will combine all our input files, into only one file, and it can put the ES6 module system into practice.  
Webpack has an eco-system, that makes it more than a bundling tool, and it gives it all capabilities to be a full build/deploy platform.  Adding to that, it has a very powerful feature called **hot-module-replacement** which allows compile and refresh the browser on the fly, while you are doing development.  


#### What is Webapck? ####
Webpack consists of the following parts:  

1. webpack: which is the main bundling module, it can be called from a command line CLI (webpack-cli), or from a plugin inside Node server.
2. webpack-cli: the command line tool to run webpack.
3. webpack-command: another command line tool powered by the community, has a slight advantages over webpack-cli.
4. webpack-dev-server: a simple Node server, that serve a single page application, providing hot-module-replacement out-of-box.  
5. webpack middlewares: used when you want to host your application in a real Node server, and the same time provides build on the fly.
6. loaders: loaders are the tools that makes webpack a full build/bundle system. They convert ES6 to ES5 javascript, or SCSS to CSS, or image to url...etc. There is a loader for each seperate build/bundle process in a web application.
7. plugins: plugins are extre process, that can add extra functionalites outside the code transformation process.

#### Install and setup webpack with typescript ####

run the following:  

```sh
npm i --save-dev webpack webpack-cli ts-node @types/node ts-loader @types/webpack
```

Where ts-loader, is the webpack loader that use typescript to compile ES6+ into ES5.

Add a new file to configure webpack, called **webpack.config.ts**.


```js
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', 'tsx', '.js']
  }
};
```

add a file index.html:

```html
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
    <div id="abc">
     <script src="./dist/bundle.js"></script> 
  </body>
</html>
```

Let's see webpack in action. Run the following command:

```sh
./node_modules/.bin/webpack
```


If you open the file **index.html** in a browser, you should see the text: 
```
Hello, My name is John
```

You will see this command will do what previous typescript tsc did, and on top of it bundle all files into one file **/dist/bundle.js**.  
To simplify calling webpack, add a script command into package.json as follows:

```js
//add this to package.json

"scripts": {
  "build": "webpack",
....
```

Now, you can run the previous command by simply:

```sh
npm run build
```

## Using Typescript with webpack config ##

Using [node-interpret](https://github.com/gulpjs/interpret) we can write webpack config in different languages.  
To write webpack config using typescript, we should install [ts-node](https://github.com/TypeStrong/ts-node), which we installed it already, but there is a small glitch.  
ts-node can only understand `commonjs` module, which means we have to stuck with old configuration of typescript configuration, and we cannot use es6 module.  
In order to fix this, we need to have a different `tsconfig` for the webpack, and in order to do that we need to install a package called `tsconfig-paths`.

```sh
npm i -D tsconfig-paths
```

Create a ts config file for webpack called: `tsconfig-for-webpack-config.json`.  
Add the following code:  

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "esModuleInterop": true
  }
}
```

ts-node can resolve the config using an environment variable called `TS_NODE_PROJECT`

```json
"scripts": {
  "build": "set TS_NODE_PROJECT=tsconfig-for-webpack-config.json webpack"
} 
```
Let us convert the `webpack.config.js` to `webpack.config.ts` as follows:

```ts
import path from 'path';

export default {
  mode: 'development',
  entry: ['./src'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', 'tsx', '.js']
  }
};
```