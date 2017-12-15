import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Route, Switch } from "react-router-dom";

import {
  onLoginUser,
  onLogoutUser,
  onUpdateUser,
  onChangePass,
  uploadFile,
  dispatchScreenWaiting,
  getAllBooksByLibrarian
} from "../actions";
import { Header, Menu, Footer } from "../components/layouts";
import { UserControl } from "../components/users";
class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoadingUpload: false,
    }
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  componentWillMount() {
    if (this.props.userActive.role === 2) {
      this.props.getAllBooksByLibrarian();
    }
  }

  async handleUpdate(user) {
    try {
      this.props.dispatchScreenWaiting(true);
      await this.props.onUpdateUser(user);
      this.props.dispatchScreenWaiting(false);
      alert("Updated successful");
    } catch(er) {
      this.props.dispatchScreenWaiting(false);
      alert("Errors update");
    }
  }

  async handleChangePass(infoPass) {
    try {
      this.props.dispatchScreenWaiting(true);
      await this.props.onChangePass(infoPass);
      this.props.dispatchScreenWaiting(false);
      this.props.onLogoutUser();
    } catch(er) {
      this.props.dispatchScreenWaiting(false);
      alert("Errors update");
    }
  }

  async handleUploadFile(uploadFile) {
    this.props.dispatchScreenWaiting(true);
    this.setState({
      isLoadingUpload: true,
    })
    try {
      await this.props.uploadFile(uploadFile);
      this.props.dispatchScreenWaiting(false);
      this.setState({
        isLoadingUpload: false,
      })
      this.props.history.push("/home");
    } catch(er) {
      this.props.dispatchScreenWaiting(false);
      this.setState({
        isLoadingUpload: false,
      })
      alert("Upload File Error!");
    }
  }
  
  render(){
    return(
      <div className="user-management">
        {
          this.props.isLoadingScreen &&
          <div className="screen-waiting">
            <i className="fa fa-refresh fa-spin"></i>
          </div>
        }
        <Header />
        <Menu />
        <UserControl
          userActive={this.props.userActive}
          onUpdate={this.handleUpdate}
          onChangePass={this.handleChangePass}
          onUploadFile={this.handleUploadFile}
          isLoadingUpload={this.state.isLoadingUpload}
          allBooksForLibrarian={this.props.allBooksForLibrarian}
        />
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    userActive: state.userActive,
    isLoadingScreen: state.isLoadingScreen,
    allBooksForLibrarian: state.books.allBooksForLibrarian,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onLoginUser,
    onLogoutUser,
    onUpdateUser,
    onChangePass,
    uploadFile,
    dispatchScreenWaiting,
    getAllBooksByLibrarian
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (User);