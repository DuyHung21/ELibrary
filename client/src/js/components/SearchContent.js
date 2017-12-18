import React from "react";
import { isEmpty } from "lodash";
import {MediaBook} from "./common";

export default props => {
  return (
    <div className="all-document">
      <div className="container">
        <div className="all-book-container">
          <hr/>
        {
          props.books.map(book => (
            <div key={book.BOOK_ID} className="">
              <MediaBook book={book}/>
              <hr/>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  )
}