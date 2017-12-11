import React from "react";
import { BoxContain } from "../../common";
import { Route, Link, Switch } from "react-router-dom";

export default props => {
  return (
    <div id="sidebar">
      <ul>
        <li>
          <Link to="/admin/dashboard"><i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/users"><i className="fa fa-users" aria-hidden="true"></i> Users</Link>
        </li>
        <li>
          <Link to="/admin/dashboard"><i className="fa fa-paint-brush" aria-hidden="true"></i> Themes</Link>
        </li>
        <li>
          <Link to="/admin/dashboard"><i className="fa fa-wrench" aria-hidden="true"></i> Setting</Link>
        </li>
      </ul>
    </div>
  )
}