import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {RegisterContent} from "../components"
import { Header, Menu, Footer } from '../components/layouts';

import {onLoginUser, onLogoutUser, onRegisterUser} from "../actions";

class Register extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.onLogoutUser();
  }

  handleLoginUser = (user) => {
    this.props.onLoginUser(user);
  }

  handleRegister = (user) => {
    this.props.onRegisterUser(user);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.userActive.username){
      this.props.history.push("/home");
    }
  }

  render(){
    return(
      <div>
        <Header />
        <Menu />
        <RegisterContent
          userActive={this.props.userActive}
          onRegister={this.handleRegister}
        />
        <Footer />
      </div>
      
    )
  }
}

function mapStateToProps(state) {
  return{
    userActive: state.userActive,
    faculties: state.faculties
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onLoginUser,
    onLogoutUser,
    onRegisterUser
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Register);