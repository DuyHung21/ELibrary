import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { isEmpty } from "lodash";
import {
  onLoginUser,
  onLogoutUser,
  getUsersByAdmin,
  onEditUserByAdmin,
  onChangeIsActiveUserByAdmin,
  dispatchScreenWaiting
} from "../../actions";
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
      users: [],
      usersShow: [],
      userSelected: {},
      numUserOnPage: 5,
      numPages: null,
      pageActive: 1,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname === "/admin/users/edit") {
      this.props.getUsersByAdmin();
    }
    if (!isEmpty(nextProps.allUsers)) {
      this.setState({
        users: nextProps.allUsers,
        usersShow: nextProps.allUsers.slice(0, nextProps.allUsers.length < this.state.numUserOnPage ? nextProps.allUsers.length : this.state.numUserOnPage),
        numPages: Math.ceil(nextProps.allUsers.length / this.state.numUserOnPage)
      })
    }
  }

  componentWillMount() {
    this.props.getUsersByAdmin();
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

  handleChangeIsActiveUser = (userDelete) => {
    return async () => {
      try {
        this.props.dispatchScreenWaiting(true);
        await this.props.onChangeIsActiveUserByAdmin(userDelete);
        await this.props.getUsersByAdmin();
        this.props.dispatchScreenWaiting(false);   
        this.handleMovePage(this.state.pageActive)();   
      } catch (er) {
        this.props.dispatchScreenWaiting(false);      
        alert("Error Disable");
      }
    }
  }

  handleSubmitFormUser = async (user) => {
    try {
      this.props.dispatchScreenWaiting(true);
      await this.props.onEditUserByAdmin(user);
      this.props.dispatchScreenWaiting(false);
      this.props.history.push("/admin/users");
    } catch (er) {
      this.props.dispatchScreenWaiting(false);
      alert("Error Edit");
    }
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
          onChangeIsActiveUser={this.handleChangeIsActiveUser}
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

function mapStateToProps(state) {
  return{
    userActive: state.userActive,
    allUsers: state.allUsers
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onLoginUser,
    onLogoutUser,
    getUsersByAdmin,
    onEditUserByAdmin,
    onChangeIsActiveUserByAdmin,
    dispatchScreenWaiting
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Users);