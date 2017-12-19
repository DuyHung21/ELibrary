import React, {Component} from 'react';
import PropTypes, { object, array } from 'prop-types';
import { isEmpty } from "lodash";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  getAllBooks,  
} from "../../actions";

import { Link } from "react-router-dom";
import { BASE_URL } from "../../api";
import BoxContain from '../common/BoxContain';
import $ from "jquery";

function MediaBook(props){
  return(
    <div className="media">
      <div className="media-left pull-left">
        <img src={`${BASE_URL + props.book.FIRST_PAGE_URL}`} className="media-object" style={{width:"60px", height: "60px"}} />
      </div>
      <div className="media-body">
        <h4 className="media-heading"><Link to={`/book/${props.book.BOOK_ID}`}>{props.book.BOOK_NAME}</Link></h4>
        <p className = "text-muted"><i className="fa fa-eye" aria-hidden="true"></i> {props.book.COUNT ? props.book.COUNT : 0}</p>
      </div>
    </div>
  )
}
MediaBook.PropTypes = {
  book: object,
}
MediaBook.defaultProps = {
  book: {},
}

class MostViewBooks extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <BoxContain name = "Sách xem nhiều nhất">
        {
          this.props.topBooks.map(book => (
            <MediaBook key={book.BOOK_ID} book={book} />
          ))
        }  
        {
          isEmpty(this.props.topBooks) && 
          <div className="text-center">
            <i className="fa fa-refresh fa-spin loader-small"></i>
          </div>
        }
      </BoxContain>
    )
  }
}

MostViewBooks.PropTypes = {
  topBooks: array,
}
MostViewBooks.defaultProps = {
  topBooks: [],
}

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    
  }

  componentWillMount() {
  }
  render(){
    return (
      <BoxContain name = "Hoạt động gần đây">
        <MediaBook />
        <MediaBook />
        <MediaBook />
        <MediaBook />
      </BoxContain>
    )
  }
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topBooks: [],
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.books.allBooks === undefined) {
      this.props.getAllBooks();
    } else {
      nextProps.books.allBooks.forEach(book => {
        if (nextProps.books.bookId && book.BOOK_ID === nextProps.books.bookId.BOOK_ID) {
          if (book.COUNT !== nextProps.books.bookId.COUNT) {
            this.props.getAllBooks();
          }
        }
      })
      const allBookOrder = [...nextProps.books.allBooks];
      allBookOrder.sort((a, b) => {
        if (a.COUNT > b.COUNT) return -1;
        if (a.COUNT < b.COUNT) return 1;
        if (a.COUNT === b.COUNT) return 0;
      });
      this.setState({
        topBooks: allBookOrder.length < 4 ? allBookOrder.slice(0,allBookOrder.length) : allBookOrder.slice(0, 4),
      })
    }
  }

  render(){
    $(function() {
      let $sidebar   = $("#sidebar-container"),
          $window    = $(window),
          offset     = $sidebar.offset(),
          topPadding = 75;
    
      $window.scroll(function() {
          if ($window.scrollTop() > offset.top - topPadding) {
              $sidebar.css({
                  marginTop: $window.scrollTop() - offset.top + topPadding
              });
          } else {
              $sidebar.stop().css({
                  marginTop: 0
              });
          }
      });
    });
    return(
      <div id = "sidebar-container">
        <MostViewBooks
          topBooks={this.state.topBooks}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    books: state.books,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getAllBooks,
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Sidebar);