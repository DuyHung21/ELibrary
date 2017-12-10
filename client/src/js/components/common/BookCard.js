import React from "react";

const BookCard = props =>{
  return(
    <div className="book-card">
      <div className="media">
        <div className="media-left media-bottom pull-left">
          <img src="http://images.carsondellosa.com/media/cd/images/product/large/104783.jpg" className="media-object" style={{width: "200px", height: "250px", display: "inline-block"}} />
        </div>
        <div className="media-body">
          <h2>Hình Học Họa Hình - Phần 5 - Dương Thọ</h2>
          <div className="status-book">
            <span><i className="fa fa-database" aria-hidden="true"></i> Dung lượng: 0.2MB</span>
            <span><i className="fa fa-file" aria-hidden="true"></i> Kiểu file: PDF</span>
            <span><i className="fa fa-eye" aria-hidden="true"></i> Lượt xem: 408</span>
            <span><i className="fa fa-cloud-download" aria-hidden="true"></i> Lượt tải: 35</span>
          </div>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, aut iste quisquam eligendi consequatur pariatur ab sit veniam? Esse veritatis nihil labore dolorum ab at possimus consectetur laboriosam minus natus.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, aut iste quisquam eligendi consequatur pariatur ab sit veniam? Esse veritatis nihil labore dolorum ab at possimus consectetur laboriosam minus natus.Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
          <p>Mục: <a href="">Công nghệ thông tin</a></p>
        </div>
      </div>
    </div>
  )
}

export default BookCard