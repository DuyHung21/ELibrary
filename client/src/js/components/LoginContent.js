import React, {Component} from 'react';

class LoginContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      errors: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        isLoading: false,
        errors: nextProps.errors,
      })
    }
  }

  onLoginUser = (e) =>{
    e.preventDefault();
    let username = this.usernameIp.value;
    let password = this.passwordIp.value;
    this.props.onLoginUser({username, password});

    this.setState({
      isLoading: true
    })
  }

  render(){
    return(
      <div id = "login-container">
        <div className = "container">
          <div id="login-form" className = "col-md-4 col-md-offset-4">
            {this.state.isLoading?<div className="loading-line"></div>:null}
            <form onSubmit={this.onLoginUser}>
              <h4>Please login to continue ...</h4>
              {
                this.state.errors ? <h5 className="text-danger"> *  {this.state.errors}</h5> : null
              }
              <div className="form-group">
                <input type="username" placeholder="Username" className="form-control" ref={input=>this.usernameIp = input} />
              </div>
  
              <div className="form-group">
                <input type="password" placeholder="Password" className="form-control" ref={input=>this.passwordIp = input} />
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

export default LoginContent;