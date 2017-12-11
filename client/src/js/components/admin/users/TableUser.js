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
            <th>Phone</th>
            <th>Role</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {props.usersShow.map((user, index) => {
          return(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.fullname}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td className="text-center">
                <button className="btn btn-sm btn-success">View</button>
                <button onClick={props.onEdit(user)} className="btn btn-sm btn-primary">Edit</button>
                <button onClick={props.onDelete(user)} className="btn btn-sm btn-danger">Delete</button>
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