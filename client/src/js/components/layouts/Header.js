import React, {Component} from 'react';
import PropTypes, { object, func, number } from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { NameFaculty } from "../../api";
import {
  getAllInfoFaculty,
} from "../../actions";
import Logo from '../../../assets/images/Logo.jpg';

import { Link, Route, Redirect } from 'react-router-dom';
import $ from 'jquery';

const SearchInput = (props) => {
  return(
    <form onSubmit={props.onSearch}>
    <div id="search-top-bar" className="input-group">
      <div className="input-group-btn search-panel">
          <button id = "dropdown-btn" type="button" className="btn bg-main dropdown-toggle" data-toggle="dropdown">
            <span id="search_concept">{NameFaculty[props.curFilter]}</span><span className="caret"></span>
          </button>
          <ul id = "dropdown-menu-search" className="dropdown-menu" role="menu">
            <li><a id={0} onClick={props.onChangeFilter} href="#">{NameFaculty[0]}</a></li>
            {
              props.faculties.map(fac => (
                <li key={fac.CATEGORY_ID}><a id={fac.CATEGORY_ID} onClick={props.onChangeFilter} href="#">{fac.CATEGORY_NAME}</a></li>
              ))
            }
          </ul>
      </div>
      <input type="hidden" name="search_param" value="all" id="search_param" />         
      <input id="inputSearch" type="text" className="form-control" name="x" placeholder="Search term..." required/>
      <span className="input-group-btn">
          <button className="btn bg-main" type="submit"><span className="glyphicon glyphicon-search"></span></button>
      </span>
    </div>
    </form>
  );
}

SearchInput.PropTypes = {
  faculties: object,
  onChangeFilter: func,
  onSearch: func,
  curFilter: number
}
SearchInput.defaultProps = {
  faculties: [],
  curFilter: 0,
  onChangeFilter: () => {},
  onSearch: () => {}
}
class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      curFilter: 0,
      nameSearch: "",
      isRedirectSerach: false,
    }
  }


  handleChangeFilter = (e) => {
    this.setState({
      curFilter: parseInt(e.target.id)
    })
  }

  handleSearch = async (e) => {
    e.preventDefault();
    const nameSearch = `${$("#inputSearch").val()}`;
    this.setState({
      nameSearch,
      isRedirectSerach: true
    });
  }

  render(){
    return(
      <header>
        {
          this.state.isRedirectSerach &&
            <Redirect to={{pathname: `/search/${this.state.nameSearch}`, filter: this.state.curFilter}} />
        }
        <div className = "container">
          <div className= "row">
            <div className = "col-sm-3">
              <div id="logo">
                <Link to = "/home"><img style={{borderRadius: "20%"}} src={Logo} alt="Logo"/></Link>
              </div>
            </div>

            <div className = "col-sm-6">
              <SearchInput
                onChangeFilter={this.handleChangeFilter}
                faculties={this.props.faculties}
                curFilter={this.state.curFilter}
                onSearch={this.handleSearch}
              />
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
                      <li><Link to="/user/uploaded"><i className="fa fa-file" aria-hidden="true"></i> Uploaded</Link></li>
                      <li><Link to="/user/downloaded"><i className="fa fa-download" aria-hidden="true"></i> Downloaded</Link></li>
                      <li><Link to="/user/bookmarked"><i className="fa fa-bookmark" aria-hidden="true"></i> Bookmarked</Link></li>
                      {
                        this.props.userActive.role === 2 &&
                        <li><Link to="/user/approve"><i className="fa fa-unlock" aria-hidden="true"></i> Duyệt/Block sách</Link></li>
                      }
                      <hr style={{margin: "4px"}}/>
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