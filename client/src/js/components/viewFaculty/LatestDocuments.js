import React, {Component} from 'react';
import {CoverBook} from '../common';

class LatestDocuments extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }
  render(){
    return(
      <div className = "faculties-group item-shadow">
        <div className = "container">
          <h4 className = "txt-color-main"><i className="fa fa-book" aria-hidden="true"></i> {this.props.title}</h4>
          <div className = "row">
          {
            this.props.books.map((book, index) => {
              return (
                <div key={index} className = "col-sm-4">
                  <CoverBook book={book} />
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    )
  }
}

export default LatestDocuments;