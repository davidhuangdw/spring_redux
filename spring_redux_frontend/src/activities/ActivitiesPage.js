import React, {Component} from  "react"
import {connect} from "react-redux"
import Grid from '@material-ui/core/Grid';
import {getDay, getFetchAll, doActivityFetchAll, getDayActivitiesArray} from "../activities/duck"
import HourTexts from "./HourTexts";
import HourLines from "./HourLines";
import Activity from "./Activity";
import {MENU_BAR_HEIGHT} from "../constants";

class ActivitiesPage extends Component{
  componentDidMount(){
    this.props.doFetchAll()
  }

  render(){
    const {getAll, activities, day} = this.props;

    return (<div style={{margin: "0.5em", marginTop: MENU_BAR_HEIGHT}}>
      <Grid container >

        <Grid container item xs={8}>
          <HourTexts {...{day, xsWidth: 1}}/>

          <Grid container item xs={11} style={{marginTop:"0.5em", position: "relative", textAlign: "center"}}>
            <HourLines {...{day}}/>
            {activities.map(activity =>
              <Activity key={activity.id} {...{activity, day}}/>
            )}
          </Grid>
        </Grid>

        <Grid container item xs={4}>
          <p>
            Right side for editor and statics:
          </p>
        </Grid>

      </Grid>
    </div>);
  }
}

export default connect(
  state => ({
    day: getDay(state),
    fetchAll: getFetchAll(state),
    activities: getDayActivitiesArray(state)
  }),
  dispatch => ({
    doFetchAll: () => dispatch(doActivityFetchAll())
  })
)(ActivitiesPage)





