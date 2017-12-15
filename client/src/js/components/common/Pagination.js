import React , {Component} from "react";
import PropTypes, { func } from 'prop-types';

class Pagination extends Component {
  render(){
    const NumBer = [];
    for (let i = 1; i <= this.props.numPages; i++) {
      NumBer.push(
        <li key={i} className="page-item">
          <span
            className={`${this.props.active===i ? "page-link btn-active" : "page-link btn-pagination"}`}
            onClick={this.props.onMovePage(i)}
          >
            {i}
          </span>
        </li>
      )
    }
    return (
      <div className = "pagination-container">
        <ul className="pagination">
          <li className="page-item"><span onClick={this.props.onMovePage(0)} className="page-link btn-pagination" >Previous</span></li>
          {
            NumBer
          }
          <li className="page-item"><span onClick={this.props.onMovePage(parseInt(this.props.numPages + 1))} className="page-link btn-pagination">Next</span></li> 
        </ul>
      </div>
    )
  }
}
Pagination.PropTypes = {
  onMovePage: func,
}
Pagination.defaultProps = {
  onMovePage: () => {}
}

export default Pagination;