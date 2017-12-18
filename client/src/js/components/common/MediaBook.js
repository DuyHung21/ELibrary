import React, {Component} from "react";
import {BASE_URL, NameFaculty} from "../../api";
import { Link } from "react-router-dom";
class MediaBook extends Component {
  render(){
    return (
      <div className ="media-book">
        <div className="media">
          <div className="media-left media-top">
            <img src={`${BASE_URL+this.props.book.FIRST_PAGE_URL}`} className="media-object img" />
          </div>
          <div className="media-body">
            <Link to={`/book/${this.props.book.BOOK_ID}`}><h4 className="media-heading">{this.props.book.BOOK_NAME}</h4></Link>
            <div className="status-book">
              <span><i className="fa fa-database" aria-hidden="true"></i> Dung lượng: 0.2MB</span>
              <span><i className="fa fa-file" aria-hidden="true"></i> Kiểu file: PDF</span>
              <span><i className="fa fa-eye" aria-hidden="true"></i> Lượt xem: 408</span>
              <span><i className="fa fa-cloud-download" aria-hidden="true"></i> Lượt tải: 35</span>
            </div>
            <p>Description: {this.props.book.BOOK_DESCRIPTION}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MediaBook;