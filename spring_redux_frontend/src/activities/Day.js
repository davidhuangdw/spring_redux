import React, {Component} from "react"
import {connect} from "react-redux"
import {getDay} from "./duck";

function Day({day}){
  return (<div className="activities-day" >
    <span style={{fontSize: "2em"}} >
      {day.format('ll')}
      </span>
    <p>
      {day.format('dddd')}
    </p>
  </div>);
}

export default connect(state => ({day: getDay(state)}))(Day);

