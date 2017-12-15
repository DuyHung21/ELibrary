
import React from "react";
import {
  BoxContain
} from "../common"

export default props => {
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