import React, {Component} from "react";
import PropTypes, { array } from 'prop-types';
import {LatestDocuments, AllDocuments} from "./index";

class ViewFacultyContent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <LatestDocuments books={this.props.books.slice(this.props.books.length > 3 ? this.props.books.length - 3 : 0, this.props.books.length > 3 ? this.props.books.length : 3).reverse()} title="Tài liệu mới nhất" />
        <AllDocuments books={this.props.books} />     
      </div>
    )
  }
}

ViewFacultyContent.PropTypes = {
  books: array,
}
ViewFacultyContent.defaultProps = {
  books: [],
}

export default ViewFacultyContent;