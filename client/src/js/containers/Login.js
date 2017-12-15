import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {LoginContent} from "../components"

import { Header, Menu, Footer } from '../components/layouts';

import {
  onLoginUser,
  onLogoutUser,
  onDowloadBook,
  saveUrlTmp
} from "../actions";

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      errors: ""
    }
    this.handleLoginUser = this.handleLoginUser.bind(this);
  }

  componentDidMount() {
    this.props.onLogoutUser();
  }

  async handleLoginUser(user) {
    try {
      await this.props.onLoginUser(user);
      this.setState({errors: null});
    } catch (er) {
      this.setState({
        errors: "Username or password invalid!",
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.userActive.username){
      if (this.props.urlTmp !== "") {
        this.props.saveUrlTmp("");
        this.props.history.push(this.props.urlTmp);
      }
      else {
        this.props.history.push("/home");
      }      
    }
  }

  render(){
    return(
      <div id = "login-content">
        <Header />
        <Menu />
        <LoginContent
          onLoginUser = {this.handleLoginUser}
          errors={this.state.errors}
        />
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    userActive: state.userActive,
    urlTmp: state.urlTmp,
    faculties: state.faculties
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onLoginUser,
    onLogoutUser,
    saveUrlTmp
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Login);