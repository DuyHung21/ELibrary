import React, {Component} from 'react';
import {CoverBook} from '../common';
import { isEmpty } from "lodash";

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
          {
            isEmpty(this.props.books) &&
            <div className="text-center">
              <i className="fa fa-refresh fa-spin loader-small"></i>
            </div>
          }
          </div>
        </div>
      </div>
    )
  }
}

export default LatestDocuments;