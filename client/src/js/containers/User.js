import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Route, Switch } from "react-router-dom";

import {
  onLoginUser,
  onLogoutUser,
  onUpdateUser,
  onChangePass,
  uploadFile
} from "../actions";
import { Header, Menu, Footer } from "../components/layouts";
import { UserControl } from "../components";
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

  async handleUpdate(user) {
    
    try {
      await this.props.onUpdateUser(user);
      alert("Update Successful");
    } catch(er) {
      alert("Errors update");
    }
  }

  async handleChangePass(infoPass) {
    try {
      await this.props.onChangePass(infoPass);
      this.props.onLogoutUser();
    } catch(er) {
      alert("Errors update");
    }
  }

  async handleUploadFile(uploadFile) {
    this.setState({
      isLoadingUpload: true,
    })
    try {
      await this.props.uploadFile(uploadFile);
      this.setState({
        isLoadingUpload: false,
      })
    } catch(er) {
      this.setState({
        isLoadingUpload: false,
      })
    }
  }
  
  render(){
    return(
      <div className="user-management">
        <Header userActive={this.props.userActive}/>
        <Menu />
        <UserControl
          userActive={this.props.userActive}
          onUpdate={this.handleUpdate}
          onChangePass={this.handleChangePass}
          onUploadFile={this.handleUploadFile}
          isLoadingUpload={this.state.isLoadingUpload}
        />
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
    onUpdateUser,
    onChangePass,
    uploadFile
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (User);