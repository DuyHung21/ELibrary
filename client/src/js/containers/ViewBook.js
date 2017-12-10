import React , {Component} from "react";

import {BoxContain, MediaIntroduct} from "../components/common";
import { ViewBookContent } from "../components/viewBook";

class ViewBook extends Component {
  render(){
    return(
      <div>
        <BoxContain name = "Thông tin sách">
          <ViewBookContent />
        </BoxContain>
      </div>
    )
  }
}
export default ViewBook;