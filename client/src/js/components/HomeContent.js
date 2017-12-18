import React, {Component} from 'react';
import { isEmpty } from "lodash";

import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Menu from './layouts/Menu';
import Sidebar from './layouts/Sidebar';
import {BoxContain, MediaIntroduct} from './common';

import {LatestDocuments} from './viewFaculty';
import '../../css/style.css';

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      catBook: {},
    }
  }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.allBooks) {
      await this.setState({
        allBooks: nextProps.allBooks,
        catBook: {},
      })
      await nextProps.allBooks.forEach(book => {
        const oldBookCat = this.state.catBook[book.CATEGORY_ID] ? this.state.catBook[book.CATEGORY_ID] : [];
        this.setState({
          catBook: {
            ...this.state.catBook,
            [book.CATEGORY_ID]: [...oldBookCat, book]
          }
        })
      });
    }
  }

  render(){
    return(
      <div>
        <BoxContain name = "Hướng dẫn sử dụng thư viện số">
          <MediaIntroduct description={"Ngày nay, nhu cầu bạn đọc về tài nguyên thông tin rất cao và đa dạng, hình thức sử dụng các nguồn tài nguyên thông tin cũng không còn chỉ giới hạn trong lĩnh vực các ấn phẩm dạng bảng in hoặc đĩa CD/VCD. Chính vì thế, công tác quản lý thư viện truyền thống đã có những chuyển biến, nhằm phục vụ bạn đọc với hình thức tổ chức quản lý và cung cấp đáp ứng nhu cầu ngày càng gia tăng và đa dạng hóa này. Đồng thời, phát triển từ thư viện truyền thống thành 'Thư viện trực tuyến' đang là xu hướng tất yếu ở tất cả các nước trên thế giới. Thư viện trực tuyến giúp khoảng cách giữa bạn đọc và tài liệu tài nguyên thông tin được rút ngắn lại. Việc tìm kiếm tài liệu tài nguyên thông tin sẽ trở nên dể dàng và nhanh chóng hơn mang lại lợi ích rất lớn cho bạn đọc."}/>
        </BoxContain>
        {
          Object.keys(this.state.catBook).map(key => {
            return (
              <LatestDocuments key={key} books={this.state.catBook[key].slice(this.state.catBook[key].length > 3 ? this.state.catBook[key].length - 3 : 0, this.state.catBook[key].length > 3 ? this.state.catBook[key].length : 3).reverse()} title = {this.props.nameFacutly[key]} />
            )
          })
        }
        {
          isEmpty(this.state.catBook) &&
          <div className="text-center">
            <i className="fa fa-refresh fa-spin loader-big"></i>
          </div>
        }
      </div>
    )
  }
}


export default HomeContent;