import React from 'react';
import {hourDuration, hourTimeFormat, Moment} from "../utils";
import {HOUR_HEIGHT} from "../constants";

const margin = 0.1;

const Activity = ({activity, day}) => {

  let {from, to, description} = activity;
  let height = hourDuration(from, to) * HOUR_HEIGHT - margin*2;
  let offset = hourDuration(day, from) * HOUR_HEIGHT;

  let style = {
    top: `${offset}em`,
    height: `${height}em`,
    margin: `${margin}em 0`,

    color: "white",
    textAlign: "left",

    width:"99%",
    left: "0.5%",
    opacity: 0.8,
    backgroundColor: "#2196F3",
    position: "absolute",
  };
  return (
    <div {...{style}} >
      <div style={{marginLeft: "0.5em"}}>
        <span> {`${hourTimeFormat(from)} - ${hourTimeFormat(to)}`} </span>
        <br/>
        <span> {description} </span>
      </div>
    </div>
  );
};

export default Activity;