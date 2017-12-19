import React from "react";
import {BASE_URL, NameFaculty} from "../../api";
import { Link } from "react-router-dom";


const BookCardMini = props => {
  return (
    <div className="book-card-mini">
      <div className="media">
        <div className="media-left media-bottom pull-left" style={{overflow: "hidden"}}>
          <img src={`${BASE_URL+props.book.FIRST_PAGE_URL}`} className="media-object img" style={{width: "150px", height: "150px", display: "inline-block"}} />
        </div>
        <div className="media-body">
          <Link to={`/book/${props.book.BOOK_ID}`}><h4>{props.book.BOOK_NAME}</h4></Link>
          <div className="status-book">
            <span><i className="fa fa-database" aria-hidden="true"></i> Dung lượng: 0.2MB</span>
            <span><i className="fa fa-file" aria-hidden="true"></i> Kiểu file: PDF</span>
            <span><i className="fa fa-eye" aria-hidden="true"></i> Lượt xem: 13</span>
            <span><i className="fa fa-cloud-download" aria-hidden="true"></i> Lượt tải: 3</span>
          </div>
          <p>Mục: <Link to={`/khoa/${props.book.CATEGORY_ID}`}>{NameFaculty[props.book.CATEGORY_ID]}</Link></p>
        </div>
      </div>
    </div>
  )
}

export default BookCardMini;