import React, {Component} from 'react';

import $ from "jquery";

const FormSignUp = props => {
  return(
    <div className="FormSignUp-content">
      <div className="modal-body" style = {{padding: "10px 80px"}}>
        <form onSubmit={props.onSubmit}>
          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="username">Username: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="text" id="username" onChange={props.onChange} required/>
              <p className = "text-danger" ></p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="email">Email: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="email" id="email" onChange={props.onChange} required/>
              <p className = "text-danger" ></p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="fullname">Full name: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="text" id="fullname" onChange={props.onChange} required/>
              <p className = "text-danger" ></p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="password">Password: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="password" id="password" onChange={props.onChange} required/>
              <p className = "text-danger" ></p>
            </div>
          </div>
          
          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="confirm">Confirm: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="password" id="confirm" onChange={props.onChange} required/>
              <p className = "text-danger" ></p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="phone">Phone: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="number" id="phone" onChange={props.onChange} required/>
              <p className = "text-danger" ></p>
            </div>
          </div>
          <div className="form-group text-right">
            <input className = "btn btn-main" type="submit" id="btn-submit" value = "Sign Up" />
          </div>
        </form>
      </div>
    </div>
  )
}

class RegisterContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      errors: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(this.state.user).forEach(key=> {
      // if (this.state.user[key] === "") {

      // }
    });
    this.props.onRegister(this.state.user);
  } 

  handleChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.id]: e.target.value
      }
    })
  }

  render(){
    return(
      <div id = "register-container">
        <div className = "container">
          <FormSignUp onSubmit={this.handleSubmit} onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
}

export default RegisterContent;