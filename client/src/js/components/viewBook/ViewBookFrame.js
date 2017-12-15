import React from "react";
import { BASE_URL } from "../../api";
const ViewBookFrame = props => {
  return (
    <div className="view-book-frame">
      <div className="row">
        <div className="col-md-7">
          <b>Vui lòng tải xuống để xem đầy đủ</b>
        </div> 
        <div className="col-md-5 text-right">
          <button className="btn btn-success">
            <i className="fa fa-bookmark" aria-hidden="true"></i> Đánh dấu
          </button>
          <button className="btn btn-primary" onClick={props.onDownload}>
            <i className="fa fa-download" aria-hidden="true"></i> Tải tài liệu
          </button>
        </div>
      </div>
      <br/>
      <div style={{overflow: "hidden"}}>
        <iframe className="col-md-12 col-xs-12 no-padding" frameBorder="0" src={`${BASE_URL+props.urlDemoBook}`} height="1000px" overflow="hiden"></iframe>
      </div>
    </div>
  )
}

export default ViewBookFrame;