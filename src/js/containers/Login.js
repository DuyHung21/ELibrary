import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {LoginContent} from "../components"

import {onLoginUser, onLogoutUser} from "../actions";

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
      this.props.history.push("/home");
    }
  }

  render(){
    return(
      <LoginContent
        userActive={this.props.userActive}
        onLoginUser = {this.handleLoginUser}
        errors={this.state.errors}
      />
    )
  }
}

function mapStateToProps(state) {
  return{
    userActive: state.userActive
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onLoginUser,
    onLogoutUser
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Login);