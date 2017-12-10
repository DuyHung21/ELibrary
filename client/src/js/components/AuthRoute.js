import React, {Component} from 'react';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import { onCheckAuth } from "../actions";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

class AuthRoute extends Component {
  constructor(props){
    super(props);
    this.checkAuth.bind(this);
    
  }
  componentWillMount() {
    this.props.onCheckAuth();
  }

  checkAuth() {
    return true;
    // if(localStorage.getItem("token")) {
    //   return true;
    // } 
    // return false;
    
  }

  render(){
    let { component: Component, ...rest} = this.props;
    return (
      <Route
        {...rest} render = {props => (
          this.checkAuth() ? (<Component {...props} />) 
                      : (<Redirect to = {{ pathname: '/login' }} />)
        )} 
      />
    )
  }
}

const mapStateToProps = (state) => {
  return({
    userActive: state.userActive
  })
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onCheckAuth
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);