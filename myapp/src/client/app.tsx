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