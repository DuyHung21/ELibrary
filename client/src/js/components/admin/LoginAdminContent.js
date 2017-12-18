import React, {Component} from 'react';

class LoginAdminContent extends Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    this.props.onLogin(username, password);
  }

  render(){
    return(
        <div id = "admin-login-container">
          <div className = "container">
            <h1 className = "text-center">ADMIN</h1>
            <div id="login-form" className = "col-md-4 col-md-offset-4">
            {this.props.isLoading?<div className="loading-line"></div>:null}
              <form onSubmit={this.handleSubmit}>
                <h4>Please login to continue ...</h4>
                <p className="text-danger">{this.props.error}</p> 
                <div className="form-group">
                  <input type="text" placeholder="Username" className="form-control" ref={(input)=>{this.username=input}} required/>
                </div>
    
                <div className="form-group">
                  <input type="password" placeholder="Password" className="form-control" ref={(input)=>{this.password=input}} required/>
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