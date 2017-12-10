import React , {Component} from "react";
import {Pagination, MediaBook} from "../common";

class AllDocuments extends Component {
  render() {
    return (
      <div className="all-document item-shadow">
        <div className="container">
          <Pagination />
          <div className="all-book-container">
            <MediaBook /> 
            <hr/>
            <MediaBook />
            <hr/>
            <MediaBook />
            <hr/>
            <MediaBook />
          </div>
          <Pagination />
        </div>
      </div>
    )
  }
}

export default AllDocuments;