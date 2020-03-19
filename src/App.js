import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Registration from './components/Registration';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import './App.css';


class App extends React.Component {
  render() {
    return (

      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Registration} />
          <Route exact path='/logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
