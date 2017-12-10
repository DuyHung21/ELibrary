import React, {Component} from 'react';
import { Route, Link, Switch } from "react-router-dom";

import { BoxContain } from "./common";
import $ from "jquery";

const SideBar = props => {
  return (
    <div id="Sidebar">
      <BoxContain name="Thành viên">
        <div className="media">
          <div className="media-left pull-left">
            <img src="http://africanleadership.co.uk/wp-content/uploads/2017/06/a-book-a-week-image.jpg" className="media-object" style={{width:"60px", height: "60px", borderRadius: "50%"}} />
          </div>
          <div className="media-body">
            <h4 className="media-heading">
              <p style={{marginTop: "15px", fontWeight: "bold"}}>{props.userActive.username}</p>
            </h4>
          </div>
        </div>
        <div className="link-control">
          <div>
            <Link to="/user/info" id="info" onClick={props.onChangAction} ><i className="fa fa-user" aria-hidden="true"></i> Thông tin cá nhân</Link>
          </div>
          <div>
            <Link to="/user/upload" id="upload" onClick={props.onChangAction} ><i className="fa fa-cloud-upload" aria-hidden="true"></i> Tải lên</Link>
          </div>
          <div>
            <Link to="/user" id="info" onClick={props.onChangAction} ><i className="fa fa-file" aria-hidden="true"></i> Tài liệu tải lên</Link>
          </div>
          <div>
            <Link to="/user" id="info" onClick={props.onChangAction} ><i className="fa fa-cloud-download" aria-hidden="true"></i> Danh dách đã tải</Link>
          </div>
          <div>
            <Link to="/user" id="info" onClick={props.onChangAction} ><i className="fa fa-heart" aria-hidden="true"></i> Danh sách đã đánh dấu</Link>
          </div>
        </div>
      </BoxContain>
    </div>
  )
}

const UserInfo = props => {
  return (
    <div id="user-info" className="screen-control">
      <BoxContain name="Quản lý thông tin cá nhân">
        <form onSubmit={props.onUpdate}>
          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="username">Username: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="text" id="username" onChange={props.onChange} required value={props.userActive.username}/>
              <p className = "text-danger" abcref="notify-username"></p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="email">Email: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="email" id="email" onChange={props.onChange} required value={props.userActive.email}/>
              <p className = "text-danger" abcref="notify-email"></p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="fullname">Full name: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="text" id="fullname" onChange={props.onChange} required value={props.userActive.fullname}/>
              <p className = "text-danger" abcref="notify-fullname"></p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="phone">Phone: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="number" id="phone" onChange={props.onChange} required value={props.userActive.phone}/>
              <p className = "text-danger" abcref="notify-phone"></p>
            </div>
          </div>
          <div className="form-group text-right">
            <input className = "btn btn-main" type="submit" id="btn-submit" value = "Cập nhật" />
          </div>
        </form>
        
        <hr/>

        <form onSubmit={props.onChangePass}>
          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="curpassword">Password: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="password" id="curPassword" onChange={props.onChange} required/>
              <p className = "text-danger"></p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="newpassword">New Password: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="password" id="newPassword" onChange={props.onChange} required/>
              <p className = "text-danger"></p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="confirm">Confirm: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="password" id="cfPassword" onChange={props.onChange} required/>
              <p className = "text-danger"></p>
            </div>
          </div>

          <div className="form-group text-right">
            <input className = "btn btn-main" type="submit" id="btn-submit" value = "Đổi mật khẩu" />
          </div>
        </form>
      </BoxContain>
    </div>
  )
}

const testCategories = [
  {
    id: 1,
    name: "1"
  },
  { 
    id: 2,
    name: "2"
  }
]

const books = [[
  {
    name: "book11"
  }, {
    name: "book12"
  }
], [
  {
    name: "book21"
  }, {
    name: "book22"
  }
]]

const UploadBox = props => {
  return(
    <div className="screen-control">
      <BoxContain name="Upload File PDF">
        <div className="form-upload">
          <form onSubmit={props.onUpLoadFile}>
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="nameDoc">Tên tài liệu: </label>
              </div>
              <div className="col-md-9">
                <input className = "form-control" type="text" id="nameDoc" onChange={props.onChange} required placeholder="Tên tài liệu"/>
                <p className = "text-danger" >{props.errors.nameDoc}</p>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="descriptionDoc">Mô tả: </label>
              </div>
              <div className="col-md-9">
                <textarea className = "form-control" id="descriptionDoc" onChange={props.onChange} required placeholder="Mô tả" rows="4"/>
                <p className = "text-danger" >{props.errors.descriptionDoc}</p>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="nameFac">Lĩnh vực/ Khoa: </label>
              </div>
              <div className="col-md-9">
                <select class="form-control" id="nameFac" onChange={props.onChange}  >
                  <option value="">---Lĩnh vực khoa---</option>
                  <option value="1">Công nghệ thông tin</option>
                  <option value="2">Cơ điện tử</option>
                  <option value="3">Cơ khí</option>
                  <option value="4">Hội cafe bóng đá bida</option>
                </select>
                <p className = "text-danger" >{props.errors.nameFac}</p>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="nameYearFac">Từ Khóa: </label>
              </div>
              <div className="col-md-9">
                <input className = "form-control" type="number" id="nameYearFac" onChange={props.onChange} required/>
                <p className = "text-danger" >{props.errors.nameYearFac}</p>
              </div>
            </div>
            
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="chooseFile">Chọn file: </label>
              </div>
              <div className="col-md-9">
                <input className = "form-control" type="file" id="chooseFile" onChange={props.onChange} required/>
                <p className = "text-danger" >{props.errors.chooseFile}</p>
              </div>
            </div>

            <div className="form-group text-right">
              <input className = "btn btn-main" type="submit" id="btn-submit" value = "Upload" />
            </div>
          </form>
        </div>
      </BoxContain>
    </div>
  )
}
class UserControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.userActive,
      uploadFile: {
        nameDoc: null,
        descriptionDoc: null,
        nameFac: null,
        nameYearFac: null,
        chooseFile: null,
      },
      errors: {
        user: {},
        uploadFile: {
          nameDoc: null,
          descriptionDoc: null,
          nameFac: null,
          nameYearFac: null,
          chooseFile: null,
        }
      }
    }
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
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserControl;

