import React, {Component} from  "react"
import {connect} from "react-redux"
import Grid from '@material-ui/core/Grid';
import SkyLight from "react-skylight"
import {
  getDay,
  getFetchAll,
  doActivityFetchAll,
  getDayActivitiesArray,
  getPost,
  doActivityPost
} from "../activities/duck"
import HourTexts from "./HourTexts";
import HourLines from "./HourLines";
import Activity from "./Activity";
import {MENU_BAR_HEIGHT} from "../constants";
import {debug} from "../utils";
import NewActivity from "./NewActivity";

class ActivitiesPage extends Component{
  componentDidMount(){
    this.props.doFetchAll()
  }

  showNewActivity = (hour)=>{
    this.clickHour = hour;
    this.newActivityDialog.show(hour);
  };

  render(){
    const {getAll, activities, day, doCreateActivity, postStatus} = this.props;
    const {showNewActivity, clickHour} = this;

    return (<div style={{margin: "0.5em", marginTop: MENU_BAR_HEIGHT}}>
      <Grid container >

        <Grid container item xs={8}>
          <HourTexts {...{xsWidth: 1, day, showNewActivity}}/>

          <Grid container item xs={11} style={{position: "relative"}}>
            <HourLines {...{day, showNewActivity}}/>
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

      <NewActivity ref={r => this.newActivityDialog=r} {...{day, doCreateActivity, postStatus}} />
    </div>);
  }
}

export default connect(
  state => ({
    day: getDay(state),
    fetchAll: getFetchAll(state),
    postStatus: getPost(state),
    activities: getDayActivitiesArray(state)
  }),
  dispatch => ({
    doFetchAll: () => dispatch(doActivityFetchAll()),
    doCreateActivity: activity => dispatch(doActivityPost(activity))
  })
)(ActivitiesPage)





