import React, {Component} from 'react';

class Footer extends Component {
  render(){
    return(
      <footer className = "bg-main">
        <div className = "container">
          <div className = "row">
            <div className = "col-sm-6">
              <p><span>ELIBRARY</span> © 2017 | All Rights Reserved.</p>
            </div>
            <div className = "col-sm-6 text-right">
              <p>
                <i className="fa fa-facebook-square" aria-hidden="true"></i>
                <i className="fa fa-twitter-square" aria-hidden="true"></i>
                <i className="fa fa-google-plus-square" aria-hidden="true"></i>
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;