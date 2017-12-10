import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { Home, Login , ViewFaculty, Register, User} from './containers';
/*Admin*/
import {LoginAdmin, Dashboard} from './containers/admin';

import AuthRoute from './components/AuthRoute';
import AuthAdminRoute from './components/admin/AuthAdminRoute';
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path = "/login" component = {Login} />
            <Route exact path = "/register" component = {Register} />
            <Route exact path = "/admin/login" component = {LoginAdmin} />
            <AuthAdminRoute exact path = "/admin" component = {Dashboard} />
            <AuthRoute path="/user" component={User}/>
            <Route path = "/" component = {Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;