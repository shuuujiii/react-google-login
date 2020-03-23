import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom'
import Registration from './components/Registration';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import User from './components/User';
import { createBrowserHistory } from 'history';
import './App.css';

const history = createBrowserHistory();

class App extends React.Component {

  render() {
    return (

      <BrowserRouter history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/user' component={User} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Registration} />
          <Route exact path='/logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
