import React, {Component} from 'react';
import $ from 'jquery';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  getAllInfoFaculty
} from "../../actions";

import { isEmpty } from "lodash"
import {Link} from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state= {
      mainFaculties: [],
      diffFacuties: [],
    }
  }

  componentWillMount() {
    this.props.getAllInfoFaculty();
  }

  render(){
    return(
      <nav id="menu-container" className="navbar navbar-default bg-main">
        <div className="container">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu-item-id" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/home"><i className="fa fa-home" aria-hidden="true"></i></Link>
          </div>
      
          <div className="collapse navbar-collapse" id="menu-item-id">
          
            <ul className="nav navbar-nav">
              {
                this.props.faculties.slice(0,5).map(fac => (
                  <li key={fac.CATEGORY_ID} className="menu-item"><Link to={`/khoa/${fac.CATEGORY_ID}`}>{fac.CATEGORY_NAME}</Link></li>
                ))
              }
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown menu-item">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Các khoa khác<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  {
                    this.props.faculties.slice(5, this.props.faculties.length).map(fac => (
                      <li key={fac.CATEGORY_ID}><Link to={`/khoa/${fac.CATEGORY_ID}`}>{fac.CATEGORY_NAME}</Link></li>
                    ))
                  }
                </ul>
              </li>
            </ul>

          </div>
          
        </div>
      </nav>
    )
  }
}
function mapStateToProps(state) {
  return{
    faculties: state.faculties
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getAllInfoFaculty
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Menu);