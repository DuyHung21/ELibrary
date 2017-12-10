import React, {Component} from 'react';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
  onLoginUser,
  onLogoutUser,
  onCheckAuth,
  getAllBooks,
} from "../actions";

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
    this.props.getAllBooks();
  }

  handleLogin = (user) => {
    this.props.onLoginUser(user);
  }

  componentDidUpdate() {
    console.log(this.props.books.allBooks);
  }

  render(){
    const home = props => {
      return (
        <HomeContent
          {...props}
          allBooks={this.props.books.allBooks}
        />
      )
    };
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
                  <Route exact path = "/" render = {home} />
                  <Route exact path = "/home" render = {home} />
                  <Route exact path = "/khoa/:name" component = {ViewFaculty} />
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
    books: state.books,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onLoginUser,
    onLogoutUser,
    onCheckAuth,
    getAllBooks
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Home);