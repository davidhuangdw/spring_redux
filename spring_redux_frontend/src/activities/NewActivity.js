import React, {Component} from 'react';
import SkyLight from "react-skylight";

import {buildActivityPayload, hourTimeFormat, validateActivityRequestBody} from "../utils";
import ActivityForm from "./ActivityForm";

class NewActivity extends Component {
  state = {beginHour: "", endHour: ""};

  visible = () => this.dialog.state.isVisible;

  show = beginHour => {
    let endHour = beginHour.clone().add(1, "hour");
    beginHour = hourTimeFormat(beginHour);
    endHour = hourTimeFormat(endHour);
    this.setState({beginHour, endHour, requested: false});
    this.dialog.show();
  };

  changeText = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  createActivity = e => {
    let {day} = this.props;
    let activity = buildActivityPayload({...this.state, day});
    this.props.doCreateActivity(activity)
      .then(this.hideAfterFulfilled);
    this.setState({requested: true});
  };

  isPending = () => this.state.requested && this.props.postStatus.pending;
  requestError = ()=> this.state.requested ? this.props.postStatus.error : null;
  isFulfilled = () => this.state.requested && !(this.isPending() || this.requestError());
  hideAfterFulfilled = ()=>{ if(this.isFulfilled()) this.dialog.hide(); };

  render() {
    let {beginHour, endHour, description, category} = this.state;
    let {day} = this.props;
    let {changeText, createActivity} = this;

    let inputErrors = validateActivityRequestBody({beginHour, endHour, description, category});
    let pending = this.isPending();
    let requestError = this.requestError();
    let disableSave = inputErrors.length>0 || pending;

    return (
      <SkyLight hideOnOverlayClicked ref={ref => this.dialog = ref} title="New Activity" >
        <ActivityForm {...{day, beginHour, endHour, description, category, inputErrors,
          pending, requestError, changeText, disableSave, onSave: createActivity}}/>
      </SkyLight>

    );
  }
}

export default NewActivity;