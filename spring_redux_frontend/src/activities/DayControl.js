import React, {Component} from 'react';
import {connect} from "react-redux"
import {Button, IconButton} from "@material-ui/core"
import {SkipNext, SkipPrevious} from "@material-ui/icons"
import {doChangeDay, getDay} from "./duck";

const style = {margin: "0"};

class DayControl extends Component {
  addDays = k => {
    let {doChangeDay,day} = this.props;
    doChangeDay(day.clone().add(k, 'days'));
  };

  render() {
    return (
      <div>
        <IconButton variant="contained" color="default" style={style} onClick={() => this.addDays(-1)}> <SkipPrevious/> </IconButton>
        <IconButton variant="contained" color="default" style={style} onClick={() => this.addDays(1)}> <SkipNext/> </IconButton>
      </div>
    );
  }
}

export default connect(
  state => ({
    day: getDay(state)
  }),
  dispatch => ({
    doChangeDay: newDay => dispatch(doChangeDay(newDay)),
  })
)(DayControl);