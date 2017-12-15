import React , {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
  getAllBooks,
} from "../actions";

import {BoxContain, MediaIntroduct} from "../components/common";
import { ViewFacultyContent } from "../components/viewFaculty";

class ViewFaculty extends Component {

  componentDidMount() {
    // console.log
  }

  render(){
    return(
      <div>
        <BoxContain name = "Khoa công nghệ thông tin">
          <MediaIntroduct />
        </BoxContain>
        <ViewFacultyContent books={this.props.books}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    books: state.books
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFaculty);