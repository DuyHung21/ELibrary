import React, {Component} from 'react';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
  onCheckAuth,
  getAllBooks,
  getAllInfoFaculty
} from "../actions";

import { Header, Footer, Sidebar, Menu } from "../components/layouts";
import { Route, Switch } from "react-router-dom";

import { Home, Login , ViewFaculty, ViewBook, Search} from '../containers';

class App extends Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.faculties);
  }

  componentWillMount() {
    this.props.onCheckAuth();
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
        <div id = "home-content">
          <div className = "container">
            <div className = "row">
              <div className = "col-md-3">
                <Sidebar />
              </div>

              <div className = "col-md-9 col-thin">
                <Switch>
                  <Route exact path = "/" component = {Home} />
                  <Route exact path = "/search/:name" component = {Search} />
                  <Route exact path = "/home" component = {Home} />
                  <Route exact path = "/khoa/:id" component = {ViewFaculty} />
                  <Route exact path = "/book/:id" component = {ViewBook} />
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
    userActive: state.userActive,
    faculties: state.faculties,
    isLoadingScreen: state.isLoadingScreen,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onCheckAuth,
    getAllBooks,
    getAllInfoFaculty,
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (App);