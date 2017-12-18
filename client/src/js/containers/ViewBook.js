import React , {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  getBookId,
  onDowloadBook,
  saveUrlTmp,
  dispatchScreenWaiting,
  getBooksByCategory,
  onBookMark
} from "../actions";

import { isEmpty } from "lodash";
import {BoxContain, MediaIntroduct} from "../components/common";
import { ViewBookContent } from "../components/viewBook";

class ViewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isBookMarked: false,
    }
    this.hanleDownload = this.hanleDownload.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.bookId) && (isEmpty(nextProps.booksCare) || (!isEmpty(nextProps.booksCare) && nextProps.booksCare[0].CATEGORY_ID !== nextProps.bookId.CATEGORY_ID))) {
      await this.props.getBooksByCategory(nextProps.bookId.CATEGORY_ID);
    }

    if (nextProps.bookId !== undefined && nextProps.match.params.id != nextProps.bookId.BOOK_ID) {
      this.setState({isLoading: true});
      await this.props.getBookId(nextProps.match.params.id);
      this.checkBookMared(nextProps.match.params.id);
      await this.props.getBooksByCategory(nextProps.bookId.CATEGORY_ID);
      this.setState({isLoading: false});
    }
  }

  async componentWillMount() {
    await this.props.getBookId(this.props.match.params.id);
    this.checkBookMared(this.props.match.params.id);
    this.setState({
      isLoading: false,
    });
  }

  async hanleDownload() {
    try {
      this.props.dispatchScreenWaiting(true);
      await this.props.onDowloadBook();
      this.props.dispatchScreenWaiting(false);
    } catch(er) {
      this.props.dispatchScreenWaiting(false);
      const linkSaveTmp = `/book/${this.props.bookId.BOOK_ID}`;
      this.props.saveUrlTmp(linkSaveTmp);
      this.props.history.push("/login");
    }
  }

  hanleBookMark = () => {
    this.props.onBookMark(this.props.bookId);
    this.setState({
      isBookMarked: true
    })
  }

  checkBookMared = (id) => {
    let isBookMarked = false;
    if(!isEmpty(this.props.booksMarked)) {
      this.props.booksMarked.forEach(book => {
        if (book.BOOK_ID === parseInt(id)) isBookMarked = true;
      });
    }
    this.setState({
      isBookMarked
    });
  }

  render(){
    return(
      <div>
        <BoxContain name = "Thông tin sách">
        {
          !this.state.isLoading ?
          <ViewBookContent
            book={this.props.bookId}
            booksCare={this.props.booksCare}
            onDownload={this.hanleDownload}
            onBookMark={this.hanleBookMark}
            isBookMarked={this.state.isBookMarked}
          /> : <div className="text-center">
            <i className="fa fa-refresh fa-spin loader-big"></i>
          </div>
        }
        </BoxContain>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    booksCare: state.books.booksCategory ? state.books.booksCategory : [],
    bookId: state.books.bookId ? state.books.bookId : {},
    booksMarked: state.books.booksMarked
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBookId,
    onDowloadBook,
    saveUrlTmp,
    dispatchScreenWaiting,
    getBooksByCategory,
    onBookMark
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (ViewBook);