import React from "react";
import {
  BoxContain
} from "../common"

export default props => {
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
                <select className="form-control" id="nameFac" onChange={props.onChange}  >
                  <option value="">---Lĩnh vực khoa---</option>
                  <option value="1">Công nghệ thông tin</option>
                  <option value="2">Cơ điện tử</option>
                  <option value="3">Cơ khí</option>
                  <option value="4">Môi trường</option>
                  <option value="5">Điện tử viễn thông</option>
                  <option value="6">Linh tinh</option>
                </select>
                <p className = "text-danger" >{props.errors.nameFac}</p>
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