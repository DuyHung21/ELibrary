import React from "react";
import { Link } from "react-router-dom";
import {
  BoxContain
} from "../common";
import $ from "jquery";

export default props => {
  $(function() {
    let $sidebar   = $("#Sidebar"),
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 75;
  
    $window.scroll(function() {
        if ($window.scrollTop() > offset.top - topPadding) {
            $sidebar.css({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().css({
                marginTop: 0
            });
        }
    });
  });
  
  return (
    <div id="Sidebar" className="sidebar-user">
      <BoxContain name="Thành viên">
        <div className="media">
          <div className="media-left pull-left">
            <img src="http://africanleadership.co.uk/wp-content/uploads/2017/06/a-book-a-week-image.jpg" className="media-object" style={{width:"60px", height: "60px", borderRadius: "50%"}} />
          </div>
          <div className="media-body">
            <h4 className="media-heading">
              <p style={{marginTop: "15px", fontWeight: "bold"}}>{props.userActive.username}</p>
            </h4>
          </div>
        </div>
        <div className="link-control">
          <div>
            <Link to="/user/info" id="info" onClick={props.onChangAction} ><i className="fa fa-user" aria-hidden="true"></i> Thông tin cá nhân</Link>
          </div>
          <div>
            <Link to="/user/upload" id="upload" onClick={props.onChangAction} ><i className="fa fa-cloud-upload" aria-hidden="true"></i> Tải lên</Link>
          </div>
          <div>
            <Link to="/user/uploaded" id="info" onClick={props.onChangAction} ><i className="fa fa-file" aria-hidden="true"></i> Danh sách uploaded</Link>
          </div>
          <div>
            <Link to="/user/downloaded" id="info" onClick={props.onChangAction} ><i className="fa fa-cloud-download" aria-hidden="true"></i> Danh sách downloaded</Link>
          </div>
          <div>
            <Link to="/user/bookmarked" id="info" onClick={props.onChangAction} ><i className="fa fa-bookmark" aria-hidden="true"></i> Danh sách đã đánh dấu</Link>
          </div>
          {
            props.userActive.role === 2 &&
            <div>
              <Link to="/user/approve" id="info" onClick={props.onChangAction} ><i className="fa fa-unlock" aria-hidden="true"></i> Duyệt/Block sách</Link>
            </div>
          }
        </div>
      </BoxContain>
    </div>
  )
}