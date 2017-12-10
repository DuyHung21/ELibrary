import React, {Component} from 'react';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

class AuthAdminRoute extends Component {
  constructor(props){
    super(props);
  }
  
  checkAuth = () => {
    return false;
  }

  render(){
    let { component: Component, ...rest} = this.props;
    return (
      <Route
        {...rest} render = {props => (
          this.checkAuth() ? (<Component {...props} />) 
                      : (<Redirect to = {{ pathname: '/admin/login' }} />)
        )} 
      />
    )
  }
}

const mapStateToProps = (state) => {
  return({
    activeUser: null
  })
}

export default connect(mapStateToProps)(AuthAdminRoute);