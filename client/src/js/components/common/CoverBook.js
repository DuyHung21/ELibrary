import React, {Component} from 'react';
import { BASE_URL } from "../../api";
import { Link } from "react-router-dom";
class CoverBook extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  render(){
    return(
      <div className = "cover-book">
        <div className="img-book-cover">
          <img className="img" src= {`${BASE_URL + this.props.book.FIRST_PAGE_URL}`} />
        </div>
        <Link to={`/book/${this.props.book.BOOK_ID}`}><div className = "footer-cover-book text-center bg-main">
          <h5>{this.props.book.BOOK_NAME}</h5>
        </div></Link>
      </div>
    )
  }
}
export default CoverBook;