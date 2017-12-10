import React, {Component} from 'react';
import {LoginAdminContent} from "../../components/admin";
import { Route, Switch } from "react-router-dom";

class LoginAdmin extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <LoginAdminContent />
    )
  }
}
export default LoginAdmin;