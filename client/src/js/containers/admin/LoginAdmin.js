import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  onLoginUser,
  onLogoutUser,
} from "../../actions";
import {LoginAdminContent} from "../../components/admin";
import { Route, Switch } from "react-router-dom";

class LoginAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      error: "",
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userActive && nextProps.userActive.username === "admin") {
      this.props.history.push("/admin");
    } 
  }

  componentWillMount() {
    this.props.onLogoutUser();
  }

  handleLogin = async (username, password ) => {
    this.setState({isLoading: true});
    if (username !== "" || password != "") {
      try {
        await this.props.onLoginUser({username, password});
        this.setState({
          isLoading: false,
        })
      } catch (er) {
        this.setState({
          isLoading: false,
          error: "Username or password are not correct!"
        })
      }
    } else {
      this.setState({
        isLoading: false,
        error: "Please can not leave empty!"
      })
    }
  }

  render(){
    return(
      <LoginAdminContent
        onLogin={this.handleLogin}
        isLoading={this.state.isLoading}
        error={this.state.error}
      />
    )
  }
}

function mapStateToProps(state) {
  return{
    userActive: state.userActive,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onLoginUser,
    onLogoutUser,
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (LoginAdmin);