import React, {Component} from 'react';

import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Menu from './layouts/Menu';
import Sidebar from './layouts/Sidebar';
import {BoxContain, MediaIntroduct} from './common';

import {LatestDocuments} from './viewFaculty';
import '../../css/style.css';

class HomeContent extends Component {
  render(){
    return(
      <div>
        <BoxContain name = "Hướng dẫn sử dụng thư viện số">
          <MediaIntroduct />
        </BoxContain>

        <LatestDocuments title = "Khoa công nghệ thông tin" />
        <LatestDocuments title = "Khoa điện tử  viễn thông" />
        <LatestDocuments title = "Khoa môi trường" />
      </div>
    )
  }
}

export default HomeContent;