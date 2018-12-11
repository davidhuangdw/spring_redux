import React, {Component} from 'react';
import {
  buildActivityPayload,
  hourTimeFormat,
  isSameDay,
  startOfDay,
  validateActivityRequestBody
} from "../utils";
import SkyLight from "react-skylight";
import ActivityForm from "./ActivityForm";

const parseActivityModel = activity =>{
  let {from, to, description, category, id} = activity;
  let beginHour = hourTimeFormat(from);
  let endHour = hourTimeFormat(to);
  let crossDay = !isSameDay(from, to);
  return {beginHour, endHour, crossDay, description, category, id};
};

class EditActivity extends Component {
  state = {beginHour: "", endHour: "", description: "", category: "", crossDay: false};

  visible = () => this.dialog.state.isVisible;

  getDay = () => this.activity && startOfDay(this.activity.from);

  show = activity => {
    this.activity = activity;
    this.setState({...parseActivityModel(activity), requested: false});
    this.dialog.show();
  };

  changeActivity = (k, v) =>{
    this.setState({[k]:v})
  };

  toggleCrossDay = e => this.setState(prev => ({crossDay: !prev.crossDay}));

  patchActivity = e => {
    let day = this.getDay();
    let activity = buildActivityPayload({...this.state, day});
    this.props.doPatchActivity(activity);
    this.setState({requested: true});
  };

  noValueChanged = () =>{
    let activity = parseActivityModel(this.activity);
    return !['beginHour', 'endHour', 'crossDay', 'description', 'category'].find(k => activity[k] !== this.state[k]);
  };

  isPending = () => this.state.requested && this.props.patchStatus.pending;
  requestError = ()=> this.state.requested ? this.props.patchStatus.error : null;

  render() {
    let {beginHour, endHour, crossDay, description, category} = this.state;
    let day = this.getDay();
    let {changeActivity, toggleCrossDay, patchActivity} = this;

    let inputErrors = validateActivityRequestBody({beginHour, endHour, crossDay, description, category});
    let pending = this.isPending();
    let requestError = this.requestError();
    let disableSave =  inputErrors.length>0 || pending || this.noValueChanged();

    return (
      <SkyLight hideOnOverlayClicked ref={ref => this.dialog = ref} title="Edit Activity" >
        {this.activity && <ActivityForm {...{
          day, beginHour, endHour, crossDay, description, category, inputErrors,
          requestError, changeActivity, toggleCrossDay, disableSave,
          onSave: patchActivity
        }}/>}
      </SkyLight>
    );
  }
}

export default EditActivity;