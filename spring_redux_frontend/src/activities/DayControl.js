import React, {Component} from 'react';
import {connect} from "react-redux"
import {Button} from "@material-ui/core"
import {doChangeDay, getDay} from "./duck";

const style = {margin: "1em"};

class DayControl extends Component {
  addDays = k => {
    let {doChangeDay,day} = this.props;
    doChangeDay(day.clone().add(k, 'days'));
  };

  render() {
    return (
      <div>
        <Button variant="contained" color="default" style={style} onClick={() => this.addDays(-1)}> Prev </Button>
        <Button variant="contained" color="default" style={style} onClick={() => this.addDays(1)}> Next </Button>
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