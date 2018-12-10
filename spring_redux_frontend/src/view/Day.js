import React from "react"
import {connect} from "react-redux"
import {getDay} from "./duck";
import {dayFormat} from "../utils";
import LargeText from "../common/LargeText";

const style = {
  display: "flex"
};

function Day({day}){
  return (<div style={style} >
    <LargeText>
      { dayFormat(day) }
    </LargeText>
    <p>
      {day.format('dddd')}
    </p>
  </div>);
}

export default connect(state => ({day: getDay(state)}))(Day);
