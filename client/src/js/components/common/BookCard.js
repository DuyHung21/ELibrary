import React from "react";
import { BASE_URL, NameFaculty } from "../../api";
import PropTypes, { object } from 'prop-types';
const BookCard = props =>{
  return(
    <div className="book-card">
      <div className="media">
        <div className="media-left media-bottom pull-left">
          <img src={`${BASE_URL+props.book.FIRST_PAGE_URL}`} className="media-object" style={{width: "200px", height: "250px", display: "inline-block"}} />
        </div>
        <div className="media-body">
          <h2>{props.book.BOOK_NAME}</h2>
          <div className="status-book">
            <span><i className="fa fa-database" aria-hidden="true"></i> Dung lượng: 0.2MB</span>
            <span><i className="fa fa-file" aria-hidden="true"></i> Kiểu file: PDF</span>
            <span><i className="fa fa-eye" aria-hidden="true"></i> {`Lượt xem: ${props.book.COUNT}`}</span>
            <span><i className="fa fa-cloud-download" aria-hidden="true"></i> Lượt tải: 35</span>
          </div>
          <p>{props.book.BOOK_DESCRIPTION}</p>
          <p>Mục: <a href="">{NameFaculty[props.book.CATEGORY_ID]}</a></p>
        </div>
      </div>
    </div>
  )
}
BookCard.PropTypes = {
  book: object,
}
BookCard.defaultProps = {
  book: {},
}
export default BookCard