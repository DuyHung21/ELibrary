import React, {Component} from 'react';
import PropTypes, { object } from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  getAllInfoFaculty,  
} from "../../actions";
import Logo from '../../../assets/images/Logo.png';

import { Link } from 'react-router-dom';
import $ from 'jquery';

const SearchInput = (props) => {
  return(
    <div id="search-top-bar" className="input-group">
      <div className="input-group-btn search-panel">
          <button id = "dropdown-btn" type="button" className="btn bg-main dropdown-toggle" data-toggle="dropdown">
            <span id="search_concept">Filter by</span><span className="caret"></span>
          </button>
          <ul id = "dropdown-menu-search" className="dropdown-menu" role="menu">
            {
              props.faculties.map(fac => (
                <li key={fac.CATEGORY_ID}><a href={`/home`}>{fac.CATEGORY_NAME}</a></li>
              ))
            }
          </ul>
      </div>
      <input type="hidden" name="search_param" value="all" id="search_param" />         
      <input type="text" className="form-control" name="x" placeholder="Search term..." />
      <span className="input-group-btn">
          <button className="btn bg-main" type="button"><span className="glyphicon glyphicon-search"></span></button>
      </span>
    </div>
  );
}

SearchInput.PropTypes = {
  faculties: object,
}
SearchInput.defaultProps = {
  faculties: [],
}
class Header extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <header>
        <div className = "container">
          <div className= "row">
            <div className = "col-sm-3">
              <div id="logo">
                <Link to = "/home"><img src={Logo} alt="Logo"/></Link>
              </div>
            </div>

            <div className = "col-sm-6">
              <SearchInput faculties={this.props.faculties}/>
            </div>

            <div className = "col-sm-3 text-right">
              { !this.props.userActive.username?
                <div id = "btn-user">
                  <Link to="/login"><button className = "btn-main" ><i className="fa fa-sign-in" aria-hidden="true"></i> Sign in</button></Link>
                  <Link to="/register"><button className = "btn-main" data-toggle="modal"><i className="fa fa-user-plus" aria-hidden="true"></i> Sign up</button></Link>
                </div>:
                <div id="infoUser">
                  <div className="dropdown" style={{display: "inline-block"}}>
                    <button style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="btn btn-sm btn-transparent dropdown-toggle" type="button" data-toggle="dropdown"><i style={{fontSize: "20px", marginRight: "5px"}} className="fa fa-user-circle-o" aria-hidden="true"></i>   <span className="caret"></span></button>
                    <ul className="dropdown-menu" style={{left: "-97px"}}>
                      <li><Link to="/user"><i className="fa fa-user" aria-hidden="true"></i> Profile</Link></li>
                      <li><Link to="/user/upload"><i className="fa fa-cloud-upload" aria-hidden="true"></i> Upload Book</Link></li>
                      <li><Link to="/user"><i className="fa fa-file" aria-hidden="true"></i> Uploaded</Link></li>
                      <li><Link to="/user"><i className="fa fa-download" aria-hidden="true"></i> Downloaded</Link></li>
                      <li><Link to="/user"><i className="fa fa-bookmark" aria-hidden="true"></i> Bookmarked</Link></li>
                      {
                        this.props.userActive.role === 2 &&
                        <li><Link to="/user/approve"><i className="fa fa-unlock" aria-hidden="true"></i> Duyệt/Block sách</Link></li>
                      }
                      <li><Link to="/login"><i className="fa fa-sign-out" aria-hidden="true"></i> Log out</Link></li>
                    </ul>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userActive: state.userActive,
    faculties: state.faculties
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (Header);