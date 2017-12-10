import React, {Component} from "react";

class MediaBook extends Component {
  render(){
    return (
      <div className ="media-book">
        <div className="media">
          <div className="media-left media-top">
            <img src="https://images-na.ssl-images-amazon.com/images/I/81Gt5Bnpr%2BL.jpg" className="media-object img" />
          </div>
          <div className="media-body">
            <h4 className="media-heading">
            Tổng Hợp Các Bài Tập Th Tin Học Đại Cương Mẫu Dành Cho Sv Năm 1 Đhbk</h4>
            <p>Tổng hợp các dạng bài tập phục vụ cho môn học TH Tin học đại cương của sinh viên năm thứ nhất Trường ĐH Bách Khoa, ĐHĐN. Các câu hỏi chỉ có tính chất tham khảo và do các sinh viên khóa trước tổng hợp.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MediaBook;