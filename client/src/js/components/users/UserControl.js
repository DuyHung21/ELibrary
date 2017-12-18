import React, {Component} from 'react';
import { Route, Link, Switch } from "react-router-dom";

import { BoxContain } from "../common";
import {
  ApproveBook,
  Uploaded,
  UploadBox,
  SideBar,
  UserInfo,
  Downloaded,
  BooksMarked
} from "./index";
import $ from "jquery";

class UserControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.userActive,
      uploadFile: {
        nameDoc: null,
        descriptionDoc: null,
        nameFac: null,
        chooseFile: null,
      },
      errors: {
        user: {},
        uploadFile: {
          nameDoc: null,
          descriptionDoc: null,
          nameFac: null,
          chooseFile: null,
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  handleChangeFormUser = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.id]: e.target.value
      }
    })
  }

  handleChangeFormUpload = (e) => {
    if (e.target.id !== "chooseFile") {
      this.setState({
        uploadFile: {
          ...this.state.uploadFile,
          [e.target.id]: e.target.value,
        },
        errors: {
          ...this.state.errors,
          uploadFile: {
            ...this.state.errors.uploadFile,
            [e.target.id]: e.target.value === null || e.target.value === "" ? "Errors" : null,
          }
        }
      })
    }
    else {
      this.setState({
        uploadFile: {
          ...this.state.uploadFile,
          [e.target.id]: e.target.files[0],
        },
        errors: {
          ...this.state.errors,
          uploadFile: {
            ...this.state.errors.uploadFile,
            [e.target.id]: e.target.files[0] === undefined ? "Errors" : null,
          }
        }
      })
    }
  }

  handleUpdate = (e) => {
    e.preventDefault();
    const {username, email, fullname, phone} = this.state.user; 
    const userUpdate = {
      username,
      email,
      fullname,
      phone
    }
    this.props.onUpdate(userUpdate);
  }

  handleChangePass = e => {
    e.preventDefault();
    const { username, curPassword, newPassword, cfPassword } = this.state.user;
    if (newPassword === cfPassword) {
      this.props.onChangePass({
        username, curPassword, newPassword, cfPassword
      });
    }
  }

  handleUploadFile = e => {
    e.preventDefault();
    let isAllowUpload = true;
    Object.keys(this.state.uploadFile).forEach(key => {
      if (this.state.uploadFile[key] === null) {
        isAllowUpload = false;
      }
    })
    if(isAllowUpload) {
      const data = new FormData();
      data.append('file', this.state.uploadFile.chooseFile);
      data.append('name', this.state.uploadFile.nameDoc);
      data.append('author', this.props.userActive.username);
      data.append('description', this.state.uploadFile.descriptionDoc);
      data.append('category', this.state.uploadFile.nameFac);
      data.append('userId', this.props.userActive.id);
      this.props.onUploadFile(data);
    }
  }
  
  render(){
    const userInfo = props => {
      return (
        <UserInfo
          userActive={this.state.user}
          onChange={this.handleChangeFormUser}
          onUpdate={this.handleUpdate}
          onChangePass={this.handleChangePass}
          {...props}
        />
      )
    };
    const uploadBox = props => {
      return (
        <UploadBox
          onChange={this.handleChangeFormUpload}
          onUpLoadFile={this.handleUploadFile}
          errors={this.state.errors.uploadFile}
          {...props}
        />
      )
    }

    const approveBook = props => {
      return (
        <ApproveBook
          books={this.props.allBooksForLibrarian}
          onApproveBook={this.props.onApproveBook}
          onBanBook={this.props.onBanBook}
          onGetBooks={this.props.onGetBookForLibrarians}
        />
      )
    }

    const uploaded = props => {
      return (
        <Uploaded
          books={this.props.booksUploaded}
          onGetBooks={this.props.onGetBooksUploaded}
        />
      )
    }


    const downloaded = props => {
      return (
        <Downloaded
          books={this.props.booksDownloaded}
          onGetBooks={this.props.onGetBooksDownloaded}
        />
      )
    }

    const booksMarked = props => {
      return (
        <BooksMarked
          books={this.props.booksMarked}
        />
      )
    }

    return(
      <div id = "user-container">
        <div className = "container">
          <div className="row">
            <div className="col-md-3">
              <SideBar
                userActive={this.state.user}
                onChangAction={this.handleChangeAction}
              />
            </div>
            <div className="col-md-9 col-thin">
              {
                this.props.isLoadingUpload && <div id="loading-line"></div> 
              }
              <Switch>
                <Route exact path="/user" render={userInfo} />
                <Route exact path="/user/info" render={userInfo} />
                <Route exact path="/user/upload" render={uploadBox} />
                <Route exact path="/user/uploaded" render={uploaded} />
                <Route exact path="/user/downloaded" render={downloaded} />
                <Route exact path="/user/bookmarked" render={booksMarked} />
                <Route exact path="/user/approve" render={approveBook} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserControl;
