import React, {Component} from 'react';
import {hourDuration, hourTimeFormat, maxMoment, minMoment} from "../utils";
import {DEFAULT_ACTIVITY_COLOR, HOUR_HEIGHT} from "../constants";

const margin = 0.1;

class Activity extends Component {

  render(){
    let {activity, day, focused, onClick, onDoubleClick} = this.props;
    let {from, to, description, category} = activity;


    let offset = hourDuration(day, maxMoment(from,day)) * HOUR_HEIGHT;
    let height = hourDuration(maxMoment(from, day), minMoment(to, day.clone().add(1, 'day'))) * HOUR_HEIGHT - margin * 2;
    if(height < 1.2) height = 1.2; // enough room for text..

    let opacity = focused ? 0.95 : 0.75;
    let backgroundColor = DEFAULT_ACTIVITY_COLOR;

    let style = {
      top: `${offset}em`,
      height: `${height}em`,
      margin: `${margin}em 0`,
      opacity,
      backgroundColor,

      color: "white",
      textAlign: "left",

      width: "99%",
      left: "0.5%",
      position: "absolute",
    };
    return (
      <div {...{style, onClick, onDoubleClick}}>
        <div style={{marginLeft: "0.5em"}}>
          <span> {`${hourTimeFormat(from)} - ${hourTimeFormat(to)}  [${category}]`} </span>
          { height>2 ? <br/> : null}
          <span> {description} </span>
        </div>
      </div>
    );
  }
};

export default Activity;