import React, {Component} from 'react';
import {CoverBook} from '../common';

class LatestDocuments extends Component {
  render(){
    return(
      <div className = "faculties-group item-shadow">
        <div className = "container">
          <h4 className = "txt-color-main"><i className="fa fa-book" aria-hidden="true"></i> {this.props.title}</h4>
          <div className = "row">
            <div className = "col-sm-4">
              <CoverBook />
            </div>
            
            <div className = "col-sm-4">
              <CoverBook />
            </div>

            <div className = "col-sm-4">
              <CoverBook />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LatestDocuments;