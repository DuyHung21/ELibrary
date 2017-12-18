import React , {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
  getAllBooks,
  getBooksByCategory
} from "../actions";

import {BoxContain, MediaIntroduct} from "../components/common";
import { ViewFacultyContent } from "../components/viewFaculty";

class ViewFaculty extends Component {

  componentWillMount() {
    this.props.getBooksByCategory(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.getBooksByCategory(nextProps.match.params.id);
    }
  }

  render(){
    const fac = this.props.faculties.filter(fac => parseInt(fac.CATEGORY_ID) === parseInt(this.props.match.params.id))[0];
    return(
      <div>
        <BoxContain name = "Khoa công nghệ thông tin">
          <MediaIntroduct description={fac?fac.CATEGORY_DESCRIPTION:""} />
        </BoxContain>
        <ViewFacultyContent books={this.props.books}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    books: state.books.booksCategory,
    faculties: state.faculties
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBooksByCategory
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFaculty);