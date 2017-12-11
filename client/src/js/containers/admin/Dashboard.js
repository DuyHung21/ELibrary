import React, {Component} from 'react';
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
export default Dashboard;