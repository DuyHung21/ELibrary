import React from "react";

const BookCardMini = props => {
  return (
    <div className="book-card-mini">
      <div className="media">
        <div className="media-left media-bottom pull-left">
          <img src="http://images.carsondellosa.com/media/cd/images/product/large/104783.jpg" className="media-object" style={{width: "150px", height: "150px", display: "inline-block"}} />
        </div>
        <div className="media-body">
          <h4>Hình Học Họa Hình - Phần 5 - Dương Thọ</h4>
          <div className="status-book">
            <span><i className="fa fa-database" aria-hidden="true"></i> Dung lượng: 0.2MB</span>
            <span><i className="fa fa-file" aria-hidden="true"></i> Kiểu file: PDF</span>
            <span><i className="fa fa-eye" aria-hidden="true"></i> Lượt xem: 408</span>
            <span><i className="fa fa-cloud-download" aria-hidden="true"></i> Lượt tải: 35</span>
          </div>
          <p>Mục: <a href="">Công nghệ thông tin</a></p>
        </div>
      </div>
    </div>
  )
}

export default BookCardMini;