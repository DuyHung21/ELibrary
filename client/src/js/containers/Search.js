import React, {Component} from 'react';
import { isEmpty } from "lodash"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {BoxContain} from "../components/common";

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
    if (nextProps.match.params.name && nextProps.match.params.name !== this.props.match.params.name) {
      try {
        this.props.dispatchScreenWaiting(true);
        await this.props.searchBooks(nextProps.match.params.name);
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
      await this.props.searchBooks(this.props.match.params.name);
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
            <h3 className="text-danger"><i className="fa fa-meh-o" aria-hidden="true"></i> {`Oops! Không có sách nào trong kho theo tên "${this.props.match.params.name}"`}</h3>
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