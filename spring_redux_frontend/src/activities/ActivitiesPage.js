import React, {Component} from  "react"
import {connect} from "react-redux"
import Grid from '@material-ui/core/Grid';
import {
  getActivityFetchAll, getActivityPost, getActivityPatch, getActivityDelete,
  getDayActivitiesArray, getFocusedActivity,
  doActivityFetchAll, doActivityPost, doActivityPatch, doActivityDelete, doChangeDay,
} from "../activities/duck"
import HourTexts from "./HourTexts";
import HourLines from "./HourLines";
import Activity from "./Activity";
import {findNext, findPrev, hourDuration} from "../utils";
import NewActivity from "./NewActivity";
import EditActivity from "./EditActivity";
import ConfirmDeleteActivity from "./ConfirmDeleteActivity";
import DayControl from "./DayControl";
import {doFocusActivity, getDay, getFocusedActivityId} from "../view/duck";
import MyAppBar from "../view/MyAppBar";
import ActivitiesApiPending from "./ActivitiesApiStatus";
import Day from "../view/Day";
import {doCategoriesFetchAll, getCategoriesByName} from "../categories/duck";
import DayHours from "./DayHours";


class ActivitiesPage extends Component{
  componentDidMount(){
    this.props.doFetchAll();
    this.props.doFetchAllCategories();
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount(){
    document.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyUp = e => {
    if(this.inDialog()) return;
    let {activities, focusedActivity, doFocusActivity, doUnfocusActivity} = this.props;
    switch (e.code) {
      case "Backspace":
        focusedActivity && this.deleteActivityDialog.show(focusedActivity, doUnfocusActivity);
        break;
      case "Enter":
        focusedActivity && this.editActivityDialog.show(focusedActivity);
        break;
      case "ArrowUp":
        let prev = focusedActivity && findPrev(focusedActivity, activities, (a, b)=>hourDuration(b.from, a.from));
        prev && doFocusActivity(prev.id);
        break;
      case "ArrowDown":
        let next = focusedActivity && findNext(focusedActivity, activities, (a, b)=>hourDuration(b.from, a.from));
        next && doFocusActivity(next.id);
        break;
      case "ArrowLeft":
        this.addDays(-1);
        break;
      case "ArrowRight":
        this.addDays(1);
        break;
      default:
    }
  };

  addDays = k => {
    let {doChangeDay,day} = this.props;
    doChangeDay(day.clone().add(k, 'days'));
  };

  inDialog = () => !![this.deleteActivityDialog, this.newActivityDialog, this.editActivityDialog].find(d => d.visible());

  makeOnDoubleClickHour = beginHour => e => !this.inDialog() && this.newActivityDialog.show(beginHour);    // due to late init newActivityDialog
  makeOnDoubleClickActivity = activity => e => !this.inDialog() && this.editActivityDialog.show(activity);
  makeOnClickActivity = activity => e => { e.stopPropagation(); this.props.doFocusActivity(activity.id); };

  render(){
    const {activities, day, postStatus, patchStatus, deleteStatus, focusedActivityId, categoriesByName,
      doCreateActivity, doPatchActivity, doDeleteActivity,
      doFocusActivity, doUnfocusActivity} = this.props;
    let {makeOnDoubleClickHour} = this;

    return (<div>
      <MyAppBar>
        <DayControl/>
        <Day />
        <ActivitiesApiPending />
      </MyAppBar>


      <Grid container className="content">

        <Grid container item xs={8} onClick={()=> focusedActivityId && doUnfocusActivity()}>
          <HourTexts {...{xsWidth: 1, day, makeOnDoubleClickHour}}/>

          <Grid container item xs={11} style={{position: "relative"}}>
            <HourLines {...{day, makeOnDoubleClickHour}}/>
            {activities.map(activity =>
              <Activity key={activity.id} focused={ activity.id === focusedActivityId }
                        categoryObject={ categoriesByName[activity.category] }
                        onClick={ this.makeOnClickActivity(activity) }
                        onDoubleClick={ this.makeOnDoubleClickActivity(activity) }
                        {...{activity, day, doFocusActivity}}
              />
            )}
          </Grid>
        </Grid>

        <Grid container item xs={4}>
          <DayHours/>
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
    fetchAll: getActivityFetchAll(state),
    postStatus: getActivityPost(state),
    patchStatus: getActivityPatch(state),
    deleteStatus: getActivityDelete(state),

    activities: getDayActivitiesArray(state),
    focusedActivityId: getFocusedActivityId(state),
    focusedActivity: getFocusedActivity(state),
    categoriesByName: getCategoriesByName(state)
  }),
  dispatch => ({
    doFetchAll: () => dispatch(doActivityFetchAll()),
    doCreateActivity: activity => dispatch(doActivityPost(activity)),
    doPatchActivity: activity => dispatch(doActivityPatch(activity)),
    doDeleteActivity: activityId => dispatch(doActivityDelete(activityId)),
    doFocusActivity: activityId => dispatch(doFocusActivity(activityId)),
    doUnfocusActivity: () => dispatch(doFocusActivity()),
    doChangeDay: newDay => dispatch(doChangeDay(newDay)),
    doFetchAllCategories: () => dispatch(doCategoriesFetchAll()),
  })
)(ActivitiesPage)
