import React from "react";
import { Pagination } from "../../common";

export default props => {
  return (
    <div className="table-user">
      <h2>Users Management</h2>
      <p>Can Edit, Delete and View Users</p>            
      <table className="table table-hover">
        <thead>
          <tr>
            <th>STT</th>
            <th>Username</th>
            <th>Email</th>
            <th>Fullname</th>
            <th>Created</th>
            <th>Role</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {props.usersShow.map((user, index) => {
          return(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.USER_NAME}</td>
              <td>{user.USER_EMAIL}</td>
              <td>{user.USER_FULLNAME}</td>
              <td>{user.USER_DATE_CREATED}</td>
              <td>{user.USER_ROLE}</td>
              <td className="text-center">
                <button onClick={props.onEdit(user)} className="btn btn-sm btn-primary"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                {
                  user.USER_IS_ACTIVE === 1 &&
                  <button onClick={props.onChangeIsActiveUser(user)} className="btn btn-sm btn-danger"><i className="fa fa-lock" aria-hidden="true"></i> Disable</button>
                }
                {
                  user.USER_IS_ACTIVE === 0 &&
                  <button onClick={props.onChangeIsActiveUser(user)} className="btn btn-sm btn-success"><i className="fa fa-unlock" aria-hidden="true"></i> Enable</button>
                }
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
      <Pagination numPages={props.numPages} active={props.active} onMovePage={props.onMovePage} />
    </div>
  )
}