import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { TableUser, FormUser } from "../../components/admin/users";

const dataUser = [];
for(let i = 0; i < 29; i++) {
  dataUser.push({"id":i,"email":`tinh${i}.bkdn2014@gmail.com`,"username":`tinh${i}`,"fullname":`Jr tinh${i}`,"phone":`012${i}`,"role":3});
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: dataUser,
      usersShow: [],
      userSelected: {},
      numUserOnPage: 5,
      numPages: null,
      pageActive: 1,
    }
  }

  componentWillMount() {
    this.setState({
      usersShow: this.state.users.slice(0,this.state.numUserOnPage),
      numPages: Math.ceil(this.state.users.length / this.state.numUserOnPage)
    })
  }

  handleMovePage = (i) => {
    return () => {
      const numPages = Math.ceil(this.state.users.length / this.state.numUserOnPage);
      if (i===0) {
        i = this.state.pageActive === 1 ? 1 : this.state.pageActive - 1;
      } else if (i >= numPages + 1) {
        i = this.state.pageActive >= i - 1 ? numPages :  this.state.pageActive + 1;
      }
      this.setState({
        pageActive: i,
        usersShow: this.state.users.slice( (i-1)*this.state.numUserOnPage,this.state.numUserOnPage*i),
        numPages: Math.ceil(this.state.users.length / this.state.numUserOnPage)
      })
    }
  }

  handleEditUser = (userSelected) => {
    return async () => {
      await this.setState({
        userSelected,
      })
      this.props.history.push("/admin/users/edit");
    }
  } 

  handleDeleteUser = (userDelete) => {
    return async () => {
      const users = this.state.users.filter(user => {
        return userDelete.id !== user.id;
      })
      await this.setState({
        users,
      })
      this.handleMovePage(this.state.pageActive)();
    }
  }

  handleSubmitFormUser = (user) => {
    console.log(user);
  }

  render() {
    const TableUserCom = props => {
      return(
        <TableUser
          usersShow={this.state.usersShow}
          numPages={this.state.numPages}
          active={this.state.pageActive}
          onMovePage={this.handleMovePage}
          onEdit={this.handleEditUser}
          onDelete={this.handleDeleteUser}
        />
      )
    }
    const FormEdit = props => {
      return(
        <FormUser
          TypeForm="Edit"
          user={this.state.userSelected}
          onSubmit={this.handleSubmitFormUser}
          {...props}
        />
      )
    }
    return (
      <div id="users-content">
        <div className="container">
          <Switch>
            <Route exact path = "/admin/users" render = {TableUserCom} />
            <Route exact path = "/admin/users/edit" component = {FormEdit} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Users;