import React , {Component} from "react";

class Pagination extends Component {
  render(){
    return (
      <div className = "pagination-container">
        <ul className="pagination">
          <li className="page-item"><a className="page-link btn-pagination" href="#">Previous</a></li>
          <li className="page-item"><a className="page-link btn-pagination" href="#">1</a></li>
          <li className="page-item"><a className="page-link btn-active" href="#">2</a></li>
          <li className="page-item"><a className="page-link btn-pagination" href="#">3</a></li>
          <li className="page-item"><a className="page-link btn-pagination" href="#">Next</a></li> 
        </ul>
      </div>
    )
  }
}

export default Pagination;