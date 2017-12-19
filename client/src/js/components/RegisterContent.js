import React, {Component} from 'react';

import $ from "jquery";

const FormSignUp = props => {
  return(
    <div className="FormSignUp-content">
      <div className="modal-body" style = {{padding: "10px 80px"}}>
        <form onSubmit={props.onSubmit}>
          <p className = "text-danger text-center" >{props.errors.errorSameUser}</p>
          <br/>
          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="username">Username: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="text" id="username" onChange={props.onChange} required/>
              <p className = "text-danger" >{props.errors.username}</p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="email">Email: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="email" id="email" onChange={props.onChange} required/>
              <p className = "text-danger" >{props.errors.email}</p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="fullname">Full name: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="text" id="fullname" onChange={props.onChange} required/>
              <p className = "text-danger" >{props.errors.fullname}</p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="password">Password: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="password" id="password" onChange={props.onChange} required/>
              <p className = "text-danger" >{props.errors.password}</p>
            </div>
          </div>
          
          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="confirm">Confirm: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="password" id="confirm" onChange={props.onChange} required/>
              <p className = "text-danger" >{props.errors.confirm}</p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-3">
              <label htmlFor="phone">Phone: </label>
            </div>
            <div className="col-md-9">
              <input className = "form-control" type="number" id="phone" onChange={props.onChange} required/>
              <p className = "text-danger" >{props.errors.phone}</p>
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorUsername !== null) {
      this.setState({
        errors: {
          ...this.state.errors,
          errorSameUser: nextProps.errorUsername,
        }
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let check = true;
    Object.keys(this.state.errors).forEach(key=> {
      console.log(this.state.errors[key]);
      if (this.state.errors[key] !== null && key !== "errorSameUser") {
        check = false;
      }
    });
    if (check) {
      this.props.onRegister(this.state.user);
    }
  } 

  handleChange = (e) => {
    let error = null;
    const patternForText = /^[a-zA-Z0-9]{6,}$/;
    const patternForPhone = /^[0-9]{10,}$/;
    const patternForEmail = /^[a-zA-Z\.0-9]{6,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]{2,}$/;
    if (e.target.id === "phone") {
      if (e.target.value.match(patternForPhone) === null) {
        error = "Phone number must be more than 10 number, ex: 0123456789";
      }
    } 
    else if (e.target.id === "email") {
      if (e.target.value.match(patternForEmail) === null) {
        error = `${e.target.id} must be like this: abc123@gmail.com`;
      }
    }
    else if (e.target.id === "confirm") {
      if (this.state.user.password) {
        if (e.target.value !== this.state.user.password) {
          error = "Confirm password not correct!";
        }
      } else {
        error = "Please input password first!";
      }
    }
    else if (e.target.id !== "phone") {
      if (e.target.value.match(patternForText) === null) {
        error = `${e.target.id} must be a string more than 6 character and dont have space`;
      }
    }

    this.setState({
      user: {
        ...this.state.user,
        [e.target.id]: e.target.value
      },
      errors: {
        ...this.state.errors,
        [e.target.id]: error
      }
    })
    
  }

  render(){
    return(
      <div id = "register-container">
        <div className = "container">
          <FormSignUp
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            errors={this.state.errors}
          />
        </div>
      </div>
    )
  }
}

export default RegisterContent;