import React, {Component} from 'react';
import {debug, hourDuration, hourTimeFormat} from "../utils";
import {HOUR_HEIGHT} from "../constants";

const margin = 0.1;

class Activity extends Component {

  focus = e => {
    let {doFocusActivity, activity} = this.props;
    e.stopPropagation();
    doFocusActivity(activity.id)
  };

  render(){
    let {activity, day, focused,  showEditActivity} = this.props;
    let {from, to, description, category} = activity;

    let height = hourDuration(from, to) * HOUR_HEIGHT - margin * 2;
    let offset = hourDuration(day, from) * HOUR_HEIGHT;
    let opacity = focused ? 0.95 : 0.75;

    let style = {
      top: `${offset}em`,
      height: `${height}em`,
      margin: `${margin}em 0`,
      opacity,

      color: "white",
      textAlign: "left",

      width: "99%",
      left: "0.5%",
      backgroundColor: "#2196F3",
      position: "absolute",
    };
    return (
      <div {...{style}}
           onClick={this.focus}
           onDoubleClick={() => showEditActivity(activity)} >
        <div style={{marginLeft: "0.5em"}}>
          <span> {`${hourTimeFormat(from)} - ${hourTimeFormat(to)}  [${category}]`} </span>
          <br/>
          <span> {description} </span>
        </div>
      </div>
    );
  }
};

export default Activity;