import React, {Component} from 'react';
import { isEmpty } from "lodash"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
  getAllBooks,
} from "../actions";

import { HomeContent } from "../components/";
import { Header, Footer, Sidebar, Menu } from "../components/layouts";
import { Route, Switch } from "react-router-dom";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      nameFacutly: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.faculties)) {
      const nameFacutly = nextProps.faculties.reduce((nameFc, curFac) =>{
        return {
          ...nameFc,
          [curFac.CATEGORY_ID] : curFac.CATEGORY_NAME,
        }
      }, {})
      this.setState({
        nameFacutly: {...nameFacutly}
      })
    }
  }

  componentWillMount() {
    this.props.getAllBooks();
  }

  render(){
    return(
      <HomeContent
        nameFacutly={this.state.nameFacutly}
        allBooks={this.props.books.allBooks}
      />
    )
  }
}

function mapStateToProps(state) {
  return{
    books: state.books,
    faculties: state.faculties
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getAllBooks
  }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Home);