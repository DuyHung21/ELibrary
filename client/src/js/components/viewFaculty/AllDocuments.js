import React , {Component} from "react";
import {Pagination, MediaBook} from "../common";
import { isEmpty } from "lodash";

class AllDocuments extends Component {
  render() {
    return (
      <div className="all-document item-shadow">
        <div className="container">
          <div className="all-book-container">
          {
            this.props.books.map(book => (
              <div key={book.BOOK_ID}>
                <MediaBook book={book}/>
                <hr/>
              </div>
            ))
          }
          {
            isEmpty(this.props.books) &&
            <div className="text-center">
              <i className="fa fa-refresh fa-spin loader-small"></i>
            </div>
          }
          </div>
        </div>
      </div>
    )
  }
}

export default AllDocuments;