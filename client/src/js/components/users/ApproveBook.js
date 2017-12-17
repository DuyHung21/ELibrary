import React, {Component} from "react";
import PropTypes, { array, func } from 'prop-types';
import {
  BoxContain,
  Pagination
} from "../common";
import {
  BASE_URL
} from "../../api";

const statusBook = {
  1: "Waiting",
  2: "Approved",
  3: "Rejected"
};

const usersShow = [];
for(let i = 0; i < 29; i++) {
  usersShow.push({"id":i,"email":`tinh${i}.bkdn2014@gmail.com`,"username":`tinh${i}`,"fullname":`Jr tinh${i}`,"phone":`012${i}`,"role":3});
}

class ApproveBook extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.onGetBooks();
  }

  render() {
    return (
      <div id="approve-book-container">
        <BoxContain name="Duyệt/Block sách">
          <div className="table-user">
            <h4>Can <code>Ban</code> and <code>Unban</code> books</h4>            
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
              {this.props.books.map((book, index) => {
                return(
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{book.BOOK_NAME}</td>
                    <td>{book.BOOK_AUTHOR}</td>
                    <td>{statusBook[book.BOOK_STATUS]}</td>
                    <td className="text-center">
                      {
                        book.BOOK_STATUS !== 2 &&
                        <button onClick={this.props.onApproveBook(book.BOOK_ID)} className="btn btn-sm btn-primary"><i className="fa fa-unlock" aria-hidden="true"></i></button>
                      }
                      {
                        book.BOOK_STATUS === 2 &&
                        <button onClick={this.props.onBanBook(book.BOOK_ID)} className="btn btn-sm btn-danger"><i className="fa fa-lock" aria-hidden="true"></i></button>
                      }
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </BoxContain>
      </div>
    );
  }
}
ApproveBook.PropTypes = {
  books: array,
  onGetBooks: func.isRequired,
};
ApproveBook.defaultProps = {
  books: [],
}

export default ApproveBook;