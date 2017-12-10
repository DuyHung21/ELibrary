import React, {Component} from 'react';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {onLoginUser, onLogoutUser, onCheckAuth} from "../actions";

import { HomeContent } from "../components/";
import { Header, Footer, Sidebar, Menu } from "../components/layouts";
import { Route, Switch } from "react-router-dom";

import { Login , ViewFaculty, ViewBook} from '../containers';

class Home extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.onCheckAuth();
  }

  handleLogin = (user) => {
    this.props.onLoginUser(user);
  }

  render(){
    return(
      <div>
        <Header userActive={this.props.userActive} />
        <Menu />
        <div id = "home-content">
          <div className = "container">
            <div className = "row">
              <div className = "col-md-3">
                <Sidebar />
              </div>

              <div className = "col-md-9 col-thin">
                <Switch>
                  <Route exact path = "/" component = {HomeContent} />
                  <Route exact path = "/home" component = {HomeContent} />
                  <Route path = "/khoa/:name" component = {ViewFaculty} />
                  <Route path = "/book/:id" component = {ViewBook} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
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
    onLogoutUser,
    onCheckAuth
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Home);