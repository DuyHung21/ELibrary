import React, { Component } from "react";

export default class FormUser extends Component {
  constructor(props) {
    super(props);
    this.sate = {
      user: {},
    }
  }

  componentWillMount() {
    if (this.props.user.USER_ID === undefined) this.props.history.push("/admin/users");
    this.setState({
      user: this.props.user
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user
    })
  }

  onChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.id]: e.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.user);
  }

  render() {
    return(
      <div className="FormSignUp-content">
        <div className="modal-body" style = {{padding: "10px 80px"}}>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="USER_NAME">Username: </label>
              </div>
              <div className="col-md-9">
                <input className = "form-control" type="text" id="USER_NAME" onChange={this.onChange} value={this.state.user.USER_NAME} required/>
                <p className = "text-danger" ></p>
              </div>
            </div>
  
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="USER_EMAIL">Email: </label>
              </div>
              <div className="col-md-9">
                <input className = "form-control" type="email" id="USER_EMAIL" onChange={this.onChange} value={this.state.user.USER_EMAIL} required/>
                <p className = "text-danger" ></p>
              </div>
            </div>
  
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="USER_FULLNAME">Full name: </label>
              </div>
              <div className="col-md-9">
                <input className = "form-control" type="text" id="USER_FULLNAME" onChange={this.onChange} value={this.state.user.USER_FULLNAME} required/>
                <p className = "text-danger" ></p>
              </div>
            </div>
  
            <div className="form-group row">
              <div className="col-md-3">
                <label htmlFor="USER_PHONE">Phone: </label>
              </div>
              <div className="col-md-9">
                <input className = "form-control" type="number" id="USER_PHONE" onChange={this.onChange} value={this.state.user.USER_PHONE} required/>
                <p className = "text-danger" ></p>
              </div>
            </div>
            <div className="form-group text-right">
              <input className = "btn btn-main" type="submit" id="btn-submit" value = {this.props.TypeForm} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
  