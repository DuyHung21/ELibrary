import React, {Component} from "react";

import {LatestDocuments, AllDocuments} from "./index";

class ViewFacultyContent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <LatestDocuments books={this.props.books} title="Tài liệu mới nhất" />
        <AllDocuments />        

      </div>
    )
  }
}

export default ViewFacultyContent;