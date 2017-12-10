import React, {Component} from 'react';

export default function BoxContain(props){
  return(
    <div className = "media-content">
      <div className="panel">
        <div className="panel-heading bg-main">{props.name}</div>
        <div className="panel-body">
          {props.children}
        </div>
      </div>
    </div>
  )
}