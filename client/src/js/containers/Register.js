import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {RegisterContent} from "../components"
import { Header, Menu, Footer } from '../components/layouts';

import {
  onLoginUser,
  onLogoutUser,
  onRegisterUser,
  dispatchScreenWaiting
} from "../actions";

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorUsername: null,
    }
  }

  componentDidMount() {
    this.props.onLogoutUser();
  }

  handleLoginUser = (user) => {
    this.props.onLoginUser(user);
  }

  handleRegister = async (user) => {
    try {
      this.setState({
        errorUsername: null
      })
      this.props.dispatchScreenWaiting(true);
      await this.props.onRegisterUser(user);
      this.props.dispatchScreenWaiting(false);
    } catch (er) {
      console.log(er);
      this.props.dispatchScreenWaiting(false); 
      this.setState({
        errorUsername: "Username or Email is avalable in database!"
      })     
    }
    
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.userActive.username){
      this.props.history.push("/home");
    }
  }

  render(){
    return(
      <div>
      {
        this.props.isLoadingScreen &&
        <div className="screen-waiting">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      }
        <Header />
        <Menu />
        <RegisterContent
          userActive={this.props.userActive}
          onRegister={this.handleRegister}
          errorUsername={this.state.errorUsername}
        />
        <Footer />
      </div>
      
    )
  }
}

function mapStateToProps(state) {
  return{
    userActive: state.userActive,
    faculties: state.faculties,
    isLoadingScreen: state.isLoadingScreen
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onLoginUser,
    onLogoutUser,
    onRegisterUser,
    dispatchScreenWaiting
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Register);