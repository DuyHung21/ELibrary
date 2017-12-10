import React, {Component} from 'react';

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
        allBooks: nextProps.allBooks
      })  
      await nextProps.allBooks.forEach(book => {
        let booksSt = [];
        if (this.state.catBook[book.CATEGORY_ID]) {
          booksSt = this.state.catBook[book.CATEGORY_ID];
          let check = true;
          booksSt.forEach(bookSt => {
            if(book.BOOK_ID === bookSt.BOOK_ID) {
              check = false;
            }
          });
          if(check) {
            booksSt.push(book);
          }
        } else {
          booksSt = [book]; 
        }
        this.setState({
          catBook: {
            ...this.state.catBook,
            [book.CATEGORY_ID]: booksSt
          }
        })
      });
      // console.log(this.state.catBook);
    }
    
  }

  render(){
    return(
      <div>
        <BoxContain name = "Hướng dẫn sử dụng thư viện số">
          <MediaIntroduct />
        </BoxContain>
        {
          Object.keys(this.state.catBook).map(key => {
            return (
              <LatestDocuments key={key} books={this.state.catBook[key]} title = "Khoa công nghệ thông tin" />
            )
          })
        }
      </div>
    )
  }
}


export default HomeContent;