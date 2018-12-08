import React, {Component} from  "react"
import {connect} from "react-redux"
import Grid from '@material-ui/core/Grid';
import {
  getDay, getFetchAll, getPost, getPatch,
  getDayActivitiesArray, getFocusedActivityId,
  doActivityFetchAll, doActivityPost,
  doActivityPatch, doFocusActivity, getFocusedActivity, getDelete, doActivityDelete,
} from "../activities/duck"
import HourTexts from "./HourTexts";
import HourLines from "./HourLines";
import Activity from "./Activity";
import {MENU_BAR_HEIGHT} from "../constants";
import {debug} from "../utils";
import NewActivity from "./NewActivity";
import EditActivity from "./EditActivity";
import ConfirmDeleteActivity from "./ConfirmDeleteActivity";


class ActivitiesPage extends Component{
  componentDidMount(){
    this.props.doFetchAll();
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount(){
    document.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyUp = e => {
    let {focusedActivity, doFocusActivity} = this.props;
    if (e.code === "Backspace" && focusedActivity && !this.inDialog()) {
      let afterDelete = doFocusActivity;  // remove focused
      this.deleteActivityDialog.show(focusedActivity, afterDelete);
    }
  };

  inDialog = () => this.deleteActivityDialog.visible()
    || this.newActivityDialog.visible()
    || this.editActivityDialog.visible();

  showNewActivity = (...args) => this.newActivityDialog.show(...args);    // due to late init newActivityDialog
  showEditActivity = (...args) => this.editActivityDialog.show(...args);

  render(){
    const {activities, day, postStatus, patchStatus, deleteStatus, focusedActivityId,
      doCreateActivity, doPatchActivity, doFocusActivity, doDeleteActivity} = this.props;
    let {showNewActivity, showEditActivity} = this;

    return (<div style={{margin: "0.5em", marginTop: MENU_BAR_HEIGHT}}>
      <Grid container >

        <Grid container item xs={8} onClick={()=> focusedActivityId && doFocusActivity()}>
          <HourTexts {...{xsWidth: 1, day, showNewActivity}}/>

          <Grid container item xs={11} style={{position: "relative"}}>
            <HourLines {...{day, showNewActivity}}/>
            {activities.map(activity =>
              <Activity key={activity.id} focused={activity.id === focusedActivityId}
                        {...{activity, day, showEditActivity, doFocusActivity}}
              />
            )}
          </Grid>
        </Grid>

        <Grid container item xs={4}>
          <p>
            Right side for editor and statics:
          </p>
        </Grid>

      </Grid>

      <NewActivity ref={r => this.newActivityDialog=r}
                   {...{day, doCreateActivity, postStatus}} />
      <EditActivity ref={r => this.editActivityDialog=r}
                    {...{day, doPatchActivity, patchStatus}} />
      <ConfirmDeleteActivity ref={r => this.deleteActivityDialog=r}
                             {...{day, deleteStatus, doDeleteActivity}} />
    </div>);
  }
}

export default connect(
  state => ({
    day: getDay(state),
    fetchAll: getFetchAll(state),
    postStatus: getPost(state),
    patchStatus: getPatch(state),
    deleteStatus: getDelete(state),

    activities: getDayActivitiesArray(state),
    focusedActivityId: getFocusedActivityId(state),
    focusedActivity: getFocusedActivity(state),
  }),
  dispatch => ({
    doFetchAll: () => dispatch(doActivityFetchAll()),
    doCreateActivity: activity => dispatch(doActivityPost(activity)),
    doPatchActivity: activity => dispatch(doActivityPatch(activity)),
    doDeleteActivity: activityId => dispatch(doActivityDelete(activityId)),
    doFocusActivity: activityId => dispatch(doFocusActivity(activityId)),
  })
)(ActivitiesPage)





