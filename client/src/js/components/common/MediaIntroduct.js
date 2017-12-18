import React, {Component} from "react";
const MediaIntroduct = props => {
  return (
    <div className="media">
      <div className="media-left pull-left">
        <img src="http://africanleadership.co.uk/wp-content/uploads/2017/06/a-book-a-week-image.jpg" className="media-object" style={{width:"150px"}} />
      </div>
      <p className = "">{props.description}</p>
    </div>
  )
}

export default MediaIntroduct;