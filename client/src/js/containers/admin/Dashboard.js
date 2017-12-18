import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { isEmpty } from "lodash";

import {DashboardContent} from "../../components/admin";
import { Header, Sidebar } from "../../components/admin/layouts";
import { Route, Switch } from "react-router-dom";
import { Users } from "./index";

class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="admin-container">
      {
        this.props.isLoadingScreen &&
        <div className="screen-waiting">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      }
        <Header />
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <Switch>
              <Route exact path = "/admin" component = {DashboardContent} />
              <Route exact path = "/admin/dashboard" component = {DashboardContent} />
              <Route path = "/admin/users" component = {Users} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    isLoadingScreen: state.isLoadingScreen
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard);