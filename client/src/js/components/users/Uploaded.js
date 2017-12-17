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

class Uploaded extends Component {
  constructor(props) {
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
                    <td><img style={{width:"50px", height: "50px", display:"inline-block"}} src={`${BASE_URL + book.FIRST_PAGE_URL}`} alt=""/></td>
                    <td>{statusBook[book.BOOK_STATUS]}</td>
                    <td className="text-center">
                    {
                      book.BOOK_STATUS === 2 &&
                      <button onClick={this.props.onApproveBook(book.BOOK_ID)} className="btn btn-sm btn-primary"><i class="fa fa-eye" aria-hidden="true"></i></button>
                    }
                    {
                      book.BOOK_STATUS !== 2 &&
                      <i className="fa fa-refresh fa-spin"></i>
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
Uploaded.PropTypes = {
  books: array,
  onGetBooks: func.isRequired,
};
Uploaded.defaultProps = {
  books: [],
}

export default Uploaded;