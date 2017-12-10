import React, {Component} from 'react';

import Logo from '../../../assets/images/Logo.png';

import { Link } from 'react-router-dom';
import $ from 'jquery';

class SearchInput extends Component {
  componentDidMount(){
  }

  render(){
    return(
      <div id="search-top-bar" className="input-group">
        <div className="input-group-btn search-panel">
            <button id = "dropdown-btn" type="button" className="btn bg-main dropdown-toggle" data-toggle="dropdown">
              <span id="search_concept">Filter by</span><span className="caret"></span>
            </button>
            <ul id = "dropdown-menu-search" className="dropdown-menu" role="menu">
              <li><a href="#contains">Contains</a></li>
              <li><a href="#its_equal">It's equal</a></li>
              <li><a href="#greather_than">Greather than</a></li>
              <li><a href="#less_than">Less than</a></li>
              <li className="divider"></li>
              <li><a href="#all">Anything</a></li>
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
              <SearchInput />
            </div>

            <div className = "col-sm-3 text-right">
              { !this.props.userActive.username?
                <div id = "btn-user">
                  <Link to="/login"><button className = "btn-main" ><i className="fa fa-sign-in" aria-hidden="true"></i> Sign in</button></Link>
                  <Link to="/register"><button className = "btn-main" data-toggle="modal"><i className="fa fa-user-plus" aria-hidden="true"></i> Sign up</button></Link>
                </div>:
                <div id="infoUser">
                  <span style={{fontSize: "18px"}}>Hello, <Link to="/user" className="txt-color-main">{this.props.userActive.username}</Link></span>
                  <Link to="/login"><button className="btn-main">Log out</button></Link>
                </div>
              }
            </div>
          </div>
        </div>
      </header>
    )
  }
}
export default Header;