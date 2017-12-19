import React, {Component} from 'react';
import { isEmpty } from "lodash"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {BoxContain} from "../components/common";
import { NameFaculty } from "../api";
import {
  searchBooks,
  dispatchScreenWaiting
} from "../actions";

import { SearchContent } from "../components/";

class Search extends Component {
  constructor(props){
    super(props);
  }

  async componentWillReceiveProps(nextProps) {
    console.log(this.props);
    if (nextProps.match.params.name && (nextProps.match.params.name !== this.props.match.params.name || nextProps.location.filter != this.props.location.filter)) {
      try {
        this.props.dispatchScreenWaiting(true);
        let pathName = nextProps.match.params.name;
        if (nextProps.location.filter) {
          pathName += `&categoryId=${nextProps.location.filter}`;
        }
        await this.props.searchBooks(pathName);
        this.props.dispatchScreenWaiting(false);
      } catch(er) {
        this.props.dispatchScreenWaiting(false);
        alert("Error search");
      }
    }
  }

  async componentWillMount() {
    try {
      this.props.dispatchScreenWaiting(true);
      let pathName = this.props.match.params.name;
      if (this.props.location.filter) {
        pathName += `&categoryId=${this.props.location.filter}`;
      }
      await this.props.searchBooks(pathName);
      this.props.dispatchScreenWaiting(false);
    } catch(er) {
      this.props.dispatchScreenWaiting(false);
      alert("Error search");
    }
  }

  render(){
    return(
      <div>
        <BoxContain name = {`Tìm kiếm theo tên "${this.props.match.params.name}"`}>
        {
          !isEmpty(this.props.books) &&
            <SearchContent
              books={this.props.books}
            />
        }
        {
          isEmpty(this.props.books) &&
          <div className="text-center">
            <h3 className="text-danger"><i className="fa fa-meh-o" aria-hidden="true"></i> {`Oops! Không có sách nào trong kho theo tên "${this.props.match.params.name}" với bộ lọc "${NameFaculty[this.props.location.filter] ? NameFaculty[this.props.location.filter] : "tất cả"}"`}</h3>
          </div>
        }
        </BoxContain>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    books: state.books.booksSearched,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    searchBooks,
    dispatchScreenWaiting
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Search);