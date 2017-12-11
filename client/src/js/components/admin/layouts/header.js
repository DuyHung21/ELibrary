import React from "react";
import { Link } from "react-router-dom"

export default props => {
  return (
    <header>
      <div className="row">
        <div className="col-md-6">
          <h3><i className="fa fa-key" aria-hidden="true"></i> Admin Area</h3>
        </div>
        <div className="col-md-6 text-right">
          <h4>Xin chao, Admin</h4>
          <Link to="/admin/login"><button className="btn">Log out</button></Link>
        </div>
      </div>
    </header>
  )
};
