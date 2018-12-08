import React from "react"
import {connect} from "react-redux"
import {getDay} from "./duck";
import {dayFormat} from "../utils";

function Day({day}){
  return (<div className="activities-day" >
    <span style={{fontSize: "2em"}} >
      { dayFormat(day) }
      </span>
    <p>
      {day.format('dddd')}
    </p>
  </div>);
}

export default connect(state => ({day: getDay(state)}))(Day);

