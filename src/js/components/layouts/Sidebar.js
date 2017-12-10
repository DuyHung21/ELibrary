import React, {Component} from 'react';

import BoxContain from '../common/BoxContain';

function MediaBook(props){
  return(
    <div className="media">
      <div className="media-left pull-left">
        <img src="http://africanleadership.co.uk/wp-content/uploads/2017/06/a-book-a-week-image.jpg" className="media-object" style={{width:"60px"}} />
      </div>
      <div className="media-body">
        <h4 className="media-heading"><a href="">React vs Node</a></h4>
        <p className = "text-muted">5/20/2017</p>
      </div>
    </div>
  )
}

class MostViewBooks extends Component {
  render(){
    return(
      <BoxContain name = "Sách xem nhiều nhất">
        <MediaBook />
        <MediaBook />
        <MediaBook />
        <MediaBook />
      </BoxContain>
    )
  }
}

class RecentActivity extends Component {
  render(){
    return (
      <BoxContain name = "Hoạt động gần đây">
        <MediaBook />
        <MediaBook />
        <MediaBook />
        <MediaBook />
      </BoxContain>
    )
  }
}

class Sidebar extends Component {
  render(){
    return(
      <div id = "sidebar-container">
        <MostViewBooks />
        <RecentActivity />
      </div>
    )
  }
}
export default Sidebar;