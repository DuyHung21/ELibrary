import React, {Component} from 'react';

import '../../../css/admin/style.css';

class LoginAdminContent extends Component {
  render(){
    return(
        <div id = "admin-login-container">
          <div className = "container">
            <h1 className = "text-center">ADMIN</h1>
            <div id="login-form" className = "col-md-4 col-md-offset-4">
              <form>
                <h4>Please login to continue ...</h4>
                <div className="form-group">
                  <input type="text" placeholder="Username" className="form-control" ref="username" />
                </div>
    
                <div className="form-group">
                  <input type="password" placeholder="Password" className="form-control" ref="password" />
                </div>
      
                <div className="form-group">
                  <input type="submit" value="Login" className="btn btn-main" />
                </div>
              </form>
            </div>
          </div>
        </div>
    )
  }
}

export default LoginAdminContent;