import React, {Component} from 'react';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import { isEmpty } from "lodash";

import {
  onCheckAuthAdmin,
} from "../../actions";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

class AuthAdminRoute extends Component {
  constructor(props){
    super(props);
  }
  
  componentWillMount() {
    this.props.onCheckAuthAdmin();
  }

  checkAuth = () => {
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    if (dataUser && dataUser.username === "admin") {
      return true;
    } else {
      return false;
    }
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
    activeUser: state.activeUser
  })
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onCheckAuthAdmin,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthAdminRoute);