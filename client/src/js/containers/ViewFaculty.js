import React , {Component} from "react";

import {BoxContain, MediaIntroduct} from "../components/common";
import { ViewFacultyContent } from "../components/viewFaculty";

class ViewFaculty extends Component {
  render(){
    return(
      <div>
        <BoxContain name = "Khoa công nghệ thông tin">
          <MediaIntroduct />
        </BoxContain>
        <ViewFacultyContent />
      </div>
    )
  }
}
export default ViewFaculty;