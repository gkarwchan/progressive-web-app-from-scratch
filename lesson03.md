# 03 - Lesson Three: CSS, Bulma, Images and Assets

We will continue on this project and add a CSS framework and a basic login page.


## CSS Frameworks ##

We are going to use a [css reset](https://blog.gisspan.com/2015/11/useful-css-tips-tip-1-css-reset.html) framework, and a general UI framework called [Bulma](https://bulma.io/).

#### Sanitize.css ####
sanitize.css is a css library that provides a [css reset](https://blog.gisspan.com/2015/11/useful-css-tips-tip-1-css-reset.html) for cross-browser styling.  
There are many CSS reset frameworks, for example we can list the following:

* [Normalize.css](https://necolas.github.io/normalize.css/).
* [Bootstrap's Reboot](https://v4-alpha.getbootstrap.com/content/reboot/).
* [Sanitize.css](https://csstools.github.io/sanitize.css/).
* Or we can just embed manually the [CSS Reset code](https://meyerweb.com/eric/tools/css/reset/).

Sanitize is the Normalize + *box-sizing: border-box*

#### Bulma ####
[Bulma](https://bulma.io/) is a simple light css framework, and the most important it doesn't have any JavaScript dependencies.  

P.S: there is another branch in this repository that shows you how to add bootstrap 4. Please refer [to this branch](https://github.com/gkarwchan/progressive-web-app-from-scratch/tree/bootstrap) for a bootstrap version.


## Installing Bulma and sanitize.css ##

```sh
npm install bulma sanitize.css
```

## CSS in the build process ##
Webpack can process any file, using the proper loader, and even we can have one entry point for our whole application, by referencing CSS from inside JavaScript.  
Let me take three minutes from your time to tell you about blending JavaScript and CSS.

#### CSS inside JavaScript ####
In old days, we used to separate CSS from JavaScript from Html.  But Nowadays, with Component-based architecture, it is easier to blend them together.  
And this is why React has "*Html*" or Jsx inside the JavaScript.  
The same with CSS, where we can just reference the CSS file from inside the JavaScript file, and we have encapsulating the component with all its assets.

#### introducing css-loader ####

css-loader interprets any @import and import of css files from inside JavaScript and resolve them.  
css-loader will be the first step which collect the css. To package them, we need another loader.  
style-loader is another loader that will put the css in &lt;style> tag in the index.html file.

Add a new rule to webpack file as follows:

```javascript
// webpack.config.babel.js
 rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            sourceMap: true,
            modules: true
          } }
        ]
      }
    ],
```
import the above loaders required by webpack

```sh
npm i --save-dev style-loader css-loader
```

The above webpack, will use css-loader's modules feature to provide local naming for local css.  
But at the same time, we need the Bulma library and its classed to be global and not local.  
In order to make Bulma classes defined globally, we have to exclude Bulma from webpack.  


```javascript
// webpack.config.babel.js
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
},
rules: [
      { ... from previous },
      { 
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            sourceMap: true,
            modules: true
          } }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
        include: [/node_modules/]
      }
    ],
```

<br />

Let us add this line to index.js file
  
```javascript
// in index.js file
import 'sanitize.css/sanitize.css';
import 'bulma/css/bulma.min.css';
```

Let us modify the file **src/client/login.jsx**


```javascript
// login.jsx

import React from 'react';

const Login = () => (
  <div className="container">
    <div className="control has-icons-left has-icons-right has-addons">
      <input id="username" name="username"
        placeholder="Enter your email"
        type="text"
        className="input"
      />
    </div>
    <div className="control has-icons-left has-icons-right has-addons">
      <input id="password" name="password"
        placeholder="Enter your password"
        type="password"
        className="input"
      />
    </div>
    <div className="field is-grouped">
      <div className="control">
        <button className="button is-link" type="submit">Submit</button>
      </div>
      <div className="control">
        <button className="button is-text">Cancel</button>
      </div>
    </div>
  </div>
);

export default Login;

```
Let us add a Bulma navigation header, and let us start to organize our components in a better way.   

We will add a folder called `components` that will have all represtative components.   

In the folder `components` create another folder `Header` and create a file `index.tsx`.  





```js

// components/Header/index.tsx
import * as React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='navbar' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to='/'>In the now</Link>
      </div>
      <div className='navbar-menu'>
        <div className='navbar-end'>
          <div className="buttons">
            <Link to="/login" className="button is-primary">
              Sign In
            </Link>
            <Link to="/login" className="button is-light">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Header }
```

Let us add the header in the main App component.

```js
// app.tsx

import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { Header } from './components/Header';


import { Home } from './home';
import { Login } from './login';

const App = () => (
  <Router>
    <div>
      <Header />
      <hr />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </div>
  </Router>
)

export default App;
```
Let us now add a Logo to the header. In order to do that we need to add a special loader to webpack that will copy images to the build output.  

### file-loader and url-loader ###

file-loader is a simple loader that copy files to the build output. It resolve the `import / require() ` statements for files in the code and copy them to output.  

You can use it to copy the images by importing the images in your code as you import any js file:  

```js
import img from './images/myimage.png';
```
And the loader will resolve the file, and copy it to the output.  

Another loader is `url-loader`, which is more advanced by converting the files into [data uri](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) base64 strings and embed them in the output **HTML** file.  

url-loader will make the bundle bigger but with fewer files, and that is a faster option for HTTP 1.1.  
But for Http/2 more files will be served faster than Http 1, so it is not necessary to include this loader.  
Actually keeping the files as binary is faster on HTTP/2 specially for bigger files like large images.  

Another options, which is better is to use hybrid solution, by converting small files to data uri, and keep the big files.  

`url-loader` provides this capabilities by giving the size limit as an option, and it falls back to `file-loader` for bigger files.  

To just show an example of how to do that in webpack

```js
// this is just to show how to use url-loader
// but we are not planning to use it
// webpack.config.ts

module: {
    rules: [
      // .... from previous
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
```

If you are planning to use HTTP/2 then it is better to use `file-loader` as follows:

```js
// webpack.config.ts

module: {
    rules: [
      // .....
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
```

Add the `file-loader`.  

```sh
npm i -D file-loader
```

Let us add the image file into the header. In the Header component:  

```js
// components/Header/index.tsx
....

import Logo from '../../images/logo.png';

const Header = () => {
  return (
    <nav className='navbar' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to='/'>
          <img src={Logo} />
        </Link>
      </div>
      .....
```
Although you are going to see the Logo in the header, but you are going to encounter an error in the build, cause by TypeScript.  
TypeScript still cannot understand import from an image file.  
To fix this problem there are two solutions:  

1. use `require` instead of `import` as follows:

```js
const logo = require('../../images/logo.png').default;
```

If you encounter an error that `require` is not defined, then you need to import `@types/node` in your packages, which I added it in the first lesson.

```sh
npm i -D @types/node
```

2. the second solution is more complicated, and I am listing it as a TypeScript tutorial.
The second solution is to add a custom type for TypeScript.  
In TypeScript the types should be declared using npm packages under namespace `@types`.  
But what if you have an external library that doesn't have `@types`?. Either you should add and publish the types in npm, or you add a custom types.  
To add a custom typing for the image (png), we can do it as follows:   

* create a folder called `typings` in the same location as `tsconfig.json`.
* either create a file called `import-png.d.ts` or create a folder `import-png` and add `index.d.ts`.
* in that file add the following code:  

```js
declare module "*.png" {
  const value: any;
  export default value;
}
```
* add the following to `tsconfig.json` file under compilerOptions:

```json
"typeRoots" : ["./node_modules/@types", "./typings"]
```

I am going to use the custom typings for the tutorial purpose only, and for real solution and for smaller projects that don't require custom typings is better to use `require`, but if your projects is big, and you have other custom typings, then better to add it.





Add a directory called `src/client/css` and add a file called `main.global.css`, and add the following code:


in the file `index.tsx`, append this line after last line with import `App` module.


```javascript
// index.jsx
import App from './app';
import './css/main.global.css';
```

If you run the build now, and run the application, you will see the main page with a nice navigation bar from Bootstrap with a link to login page.
```sh
npm run build
npm start
```
Let us modify the `login.jsx` page to be more a simple login page, with two input text: username , and password, with a button called `login`, and when we press the button we do something with the username and password.

```javascript

import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: ''};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(this.state);
    // do something with username and password
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="field">
            <label htmlFor="email" className="label">Email address</label>
            <div class="control">
              <input type="email" className="input" id="email" aria-describedby="emailHelp" placeholder="Enter email" 
                onChange={(event) => this.setState({username: event.target.value})}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
          </div>
          <div className="field">
            <label htmlFor="password" className="label">Password</label>
            <div class="control">
              <input type="password" className="input" id="password" placeholder="Password" 
                onChange={(event) => this.setState({password: event.target.value})}/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" id="checkout" />
                Check me out
              </label>
            </div>
          </div>
          <button type="button" className="button is-primary"
            onClick={(event) => this.handleClick(event)}>Login</button>
        </form>
      </div>      
    );
  }
}
export default Login;
```
The above form will now display the username and password entered into the input text boxes.  

<br />
<br />

Navigate to the login page, and you will see a beautiful login page.  
Try to enter username, and password, and press the login button, and see the result in the console.  
