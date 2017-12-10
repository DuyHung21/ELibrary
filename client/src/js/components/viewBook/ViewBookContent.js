import React, {Component} from "react";
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
        <BookCard />
        <hr/>
        <ViewBookFrame />
        <hr/>
        <BookCardMini />
      </div>
    )
  }
}

export default ViewBookContent;