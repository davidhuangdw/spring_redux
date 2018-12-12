import React, {Component} from 'react';
import {connect} from "react-redux"
import {Grid} from "@material-ui/core"
import {getDayCategoryHours} from "./duck";
import {getCategoriesByName} from "../categories/duck";
import {DEFAULT_ACTIVITY_COLOR} from "../constants";

const BAR_WIDTH = 2;
const FULL_HOURS = 9;

const lengthPercent = count => count*100/FULL_HOURS;
const hourBarStyle = hour => ({
  backgroundColor: hour.color,
  width: `${lengthPercent(hour.count)}%`,
  height: `${BAR_WIDTH}em`,
  color: "white",
});

class DayHours extends Component {
  sortedHours = ()=>{
    let {hours, categoriesByName} = this.props;
    return Object.keys(hours)
      .map(category => ({category: category, count: hours[category],
        color: (categoriesByName[category] && categoriesByName[category].color) || DEFAULT_ACTIVITY_COLOR}))
      .sort((a,b) => b.count - a.count);    //decreasing
  };

  render() {
    return (
      <Grid item xs={12} container className="flex-columns" style={{marginLeft: "0.5em"}}>

        {this.sortedHours().map(hour => <div className="flex-columns" key={hour.category}>

          <div style={{textAlign: "left"}}> {hour.category} : </div>
          <div style={hourBarStyle(hour)}>{hour.count} </div>

        </div>)}

      </Grid>
    );
  }
}

export default connect(
  state => ({
    hours:  getDayCategoryHours(state),
    categoriesByName: getCategoriesByName(state),
  }),
)(DayHours);