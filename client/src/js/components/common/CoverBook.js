import React, {Component} from 'react';

class CoverBook extends Component {
  render(){
    return(
      <div className = "cover-book">
        <div className="img-book-cover">
          <img className="img" src="https://images-na.ssl-images-amazon.com/images/I/81Gt5Bnpr%2BL.jpg"/>
        </div>
        <div className = "footer-cover-book text-center bg-main">
          <h5>Giao trinh harry potter hay nhat cua nha xuat ban DN</h5>
        </div>
      </div>
    )
  }
}
export default CoverBook;