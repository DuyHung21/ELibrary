import React, {Component} from "react";
import PropTypes, { object } from 'prop-types';
import { isEmpty } from "lodash";

import { BookCard, BookCardMini } from "../common";
import { ViewBookFrame } from "./index";
// import {LatestDocuments, AllDocuments} from "./index";

class ViewBookContent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="ViewBook-container">
        <BookCard
          book={this.props.book}
        />
        <hr/>
        <ViewBookFrame
          urlDemoBook={this.props.book.DEMO_URL}
          onDownload={this.props.onDownload}
        />
        <hr/>
        {
          this.props.booksCare.map(book=>(
            <BookCardMini key={book.BOOK_ID} book={book}/>
          ))
        }
      </div>
    )
  }
}

ViewBookContent.PropTypes = {
  book: object,
}
ViewBookContent.defaultProps = {
  book: {},
}
export default ViewBookContent;