import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from "react-router-dom";

class Menu extends Component {

  componentDidMount(){}

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
              <li className="menu-item"><Link to="/khoa/cntt">Cong nghe thong tin</Link></li>
              <li className = "menu-item"><a href="">Co khi</a></li>
              <li className = "menu-item"><a href="">Dien</a></li>
              <li className = "menu-item"><a href="">Moi truong</a></li>
              <li className = "menu-item"><a href="">Dien tu vien thong</a></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown menu-item">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Các khoa khác<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
            </ul>

          </div>
          
        </div>
      </nav>
    )
  }
}
export default Menu;