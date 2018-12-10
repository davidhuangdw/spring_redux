import React, {Component} from 'react';
import {connect} from "react-redux"
import {IconButton} from "@material-ui/core"
import {NavigateBefore, NavigateNext, NearMe} from "@material-ui/icons"
import {doChangeDay} from "./duck";
import {getDay} from "../view/duck";
import {today} from "../utils";

class DayControl extends Component {
  addDays = k => {
    let {doChangeDay,day} = this.props;
    doChangeDay(day.clone().add(k, 'days'));
  };
  goToday = ()=>{
    this.props.doChangeDay(today());
  };

  render() {
    let {addDays, goToday} = this;
    return (
      <div>
        <IconButton variant="contained" color="inherit" onClick={() => addDays(-1)}> <NavigateBefore/> </IconButton>
        <IconButton variant="contained" color="inherit" onClick={() => addDays(1)}> <NavigateNext/> </IconButton>
        <IconButton variant="contained" color="inherit" onClick={goToday}> <NearMe/> </IconButton>
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