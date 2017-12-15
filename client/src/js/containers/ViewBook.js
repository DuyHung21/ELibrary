import React , {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { getBookId, onDowloadBook, saveUrlTmp } from "../actions";

import { isEmpty } from "lodash";
import {BoxContain, MediaIntroduct} from "../components/common";
import { ViewBookContent } from "../components/viewBook";

class ViewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
    this.hanleDownload = this.hanleDownload.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.bookId !== undefined && nextProps.match.params.id != nextProps.bookId.BOOK_ID) {
      this.setState({isLoading: true});
      await this.props.getBookId(nextProps.match.params.id);
      this.setState({isLoading: false});
    }
  }

  async componentWillMount() {
    await this.props.getBookId(this.props.match.params.id);
    this.setState({isLoading: false});
  }

  async hanleDownload() {
    try {
      await this.props.onDowloadBook();
    } catch(er) {
      const linkSaveTmp = `/book/${this.props.bookId.BOOK_ID}`;
      this.props.saveUrlTmp(linkSaveTmp);
      this.props.history.push("/login");
    }
  }

  render(){
    return(
      <div>
        <BoxContain name = "Thông tin sách">
        {
          !this.state.isLoading ?
          <ViewBookContent
            book={this.props.bookId}
            onDownload={this.hanleDownload}
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
    bookId: state.books.bookId,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBookId,
    onDowloadBook,
    saveUrlTmp
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (ViewBook);