import React, {Component} from 'react';
import {buildActivityPayload, hourTimeFormat, validateActivityRequestBody} from "../utils";
import SkyLight from "react-skylight";
import ActivityForm from "./ActivityForm";

const parseActivityModel = activity =>{
  let {from, to, description, category, id} = activity;
  let beginHour = hourTimeFormat(from);
  let endHour = hourTimeFormat(to);
  return {beginHour, endHour, description, category, id};
};

class EditActivity extends Component {
  state = {beginHour: "", endHour: "", description: "", category: ""};

  visible = () => this.dialog.state.isVisible;

  show = activity => {
    this.activity = activity;
    this.setState({...parseActivityModel(activity), requested: false});
    this.dialog.show();
  };

  changeText = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  patchActivity = e => {
    let {day} = this.props;
    let activity = buildActivityPayload({...this.state, day});
    this.props.doPatchActivity(activity);
    this.setState({requested: true});
  };

  noValueChanged = () =>{
    let activity = parseActivityModel(this.activity);
    for(let k of ['beginHour', 'endHour', 'description', 'category'])
      if(activity[k] !== this.state[k]) return false;
    return true;
  };

  isPending = () => this.state.requested && this.props.patchStatus.pending;
  requestError = ()=> this.state.requested ? this.props.patchStatus.error : null;

  render() {
    let {beginHour, endHour, description, category} = this.state;
    let {day} = this.props;
    let {changeText, patchActivity} = this;

    let inputErrors = validateActivityRequestBody({beginHour, endHour, description, category});
    let pending = this.isPending();
    let requestError = this.requestError();
    let disableSave =  inputErrors.length>0 || pending || this.noValueChanged();

    return (
      <SkyLight hideOnOverlayClicked ref={ref => this.dialog = ref} title="Edit Activity" >
        <ActivityForm {...{day, beginHour, endHour, description, category, inputErrors,
          pending, requestError, changeText, disableSave, onSave: patchActivity}}/>
      </SkyLight>
    );
  }
}

export default EditActivity;