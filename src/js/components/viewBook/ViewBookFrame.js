import React from "react";

const ViewBookFrame = props => {
  return (
    <div className="view-book-frame">
      <div className="row">
        <div className="col-md-7">
          <b>Vui lòng tải xuống để xem đầy đủ</b>
        </div> 
        <div className="col-md-5 text-right">
          <button className="btn btn-success"><i class="fa fa-bookmark" aria-hidden="true"></i> Đánh dấu</button>
          <button className="btn btn-primary"><i class="fa fa-download" aria-hidden="true"></i> Tải tài liệu</button>
        </div>
      </div>
      <br/>
      <div style={{overflow: "hidden"}}>
        <iframe class="col-md-12 col-xs-12 no-padding" frameborder="0" src="http://192.168.1.55:3000/api/download/pdf/test.pdf" height="1000px" overflow="hiden" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
    </div>
  )
}

export default ViewBookFrame;