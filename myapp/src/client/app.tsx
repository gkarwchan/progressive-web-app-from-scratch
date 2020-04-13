import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';


import { Home } from './home';
import { Login } from './login';

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      <hr />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </div>
  </Router>
)

export default App;