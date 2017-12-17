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
  getAllBooksByLibrarian,
  approveBook,
  banBook,
  getBooksUploaded,
  getBooksDownloaded,
} from "../actions";
import { Header, Menu, Footer } from "../components/layouts";
import { UserControl } from "../components/users";
class User extends Component {
  constructor(props) {
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
      this.props.history.push("/user/uploaded");
    } catch(er) {
      this.props.dispatchScreenWaiting(false);
      this.setState({
        isLoadingUpload: false,
      })
      alert("Upload File Error!");
    }
  }
  
  handleApproveBook = (id) => {
    return async () => {
      try {
        this.props.dispatchScreenWaiting(true);
        await this.props.approveBook(id);
        this.props.dispatchScreenWaiting(false);
      } catch (er) {
        this.props.dispatchScreenWaiting(false);
        alert("Error Approve");
      }
    }
  }

  handleBanBook = id => {
    return async () => {
      try {
        this.props.dispatchScreenWaiting(true);
        await this.props.banBook(id);
        this.props.dispatchScreenWaiting(false);
      } catch (er) {
        this.props.dispatchScreenWaiting(false);
        alert("Error Approve");
      }
    }
  }

  render() {
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
          onApproveBook={this.handleApproveBook}
          onBanBook={this.handleBanBook}
          onGetBookForLibrarians={this.props.getAllBooksByLibrarian}
          onGetBooksUploaded={this.props.getBooksUploaded}
          onGetBooksDownloaded={this.props.getBooksDownloaded}
          booksUploaded={this.props.booksUploaded}
          booksDownloaded={this.props.booksDownloaded}
        />
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userActive: state.userActive,
    isLoadingScreen: state.isLoadingScreen,
    allBooksForLibrarian: state.books.allBooksForLibrarian,
    booksUploaded: state.books.booksUploaded,
    booksDownloaded: state.books.booksDownloaded
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onLoginUser,
    onLogoutUser,
    onUpdateUser,
    onChangePass,
    uploadFile,
    dispatchScreenWaiting,
    getAllBooksByLibrarian,
    approveBook,
    banBook,
    getBooksUploaded,
    getBooksDownloaded
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (User);