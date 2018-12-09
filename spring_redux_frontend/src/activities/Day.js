import React from "react"
import {connect} from "react-redux"
import {getDay} from "./duck";
import {dayFormat} from "../utils";

const style={fontSize: "2em"};

function Day({day}){
  return (<div className="activities-day" >
    <span style={style} >
      { dayFormat(day) }
      </span>
    <p>
      {day.format('dddd')}
    </p>
  </div>);
}

export default connect(state => ({day: getDay(state)}))(Day);

