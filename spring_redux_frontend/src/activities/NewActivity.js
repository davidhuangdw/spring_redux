import React, {Component} from 'react';
import SkyLight from "react-skylight";

import {buildActivityPayload, hourTimeFormat, isSameDay, validateActivityRequestBody} from "../utils";
import ActivityForm from "./ActivityForm";

const initialState = {beginHour: "", endHour: "", crossDay: false, description: "", category: ""};

class NewActivity extends Component {
  state = initialState;

  componentDidMount(){
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount(){
    document.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyUp = e => {
    if (!this.visible()) return;
    switch (e.code) {
      case "ArrowDown":
        if(this.savable()) this.createActivity();
        break;
      default:
    }
  };

  visible = () => this.dialog.state.isVisible;

  show = (beginHour, e) => {
    let rect = e.target.getBoundingClientRect();
    if(e.clientY - rect.top > rect.height*0.5)
      beginHour = beginHour.clone().add(0.5, "hour");

    let endHour = beginHour.clone().add(1, "hour");
    let crossDay = !isSameDay(beginHour, endHour);
    beginHour = hourTimeFormat(beginHour);
    endHour = hourTimeFormat(endHour);
    this.setState({...initialState, beginHour, endHour, crossDay, requested: false});
    this.dialog.show();
  };

  changeActivity = (k, v) =>{
    this.setState({[k]:v})
  };
  toggleCrossDay = e => this.setState(prev => ({crossDay: !prev.crossDay}));

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
  savable = () => !this.isPending() && validateActivityRequestBody(this.state).length === 0;

  render() {
    let {beginHour, endHour, crossDay, description, category} = this.state;
    let {day} = this.props;
    let {changeActivity, toggleCrossDay, createActivity} = this;

    let inputErrors = validateActivityRequestBody(this.state);
    let requestError = this.requestError();
    let disableSave = !this.savable();

    return (
      <SkyLight hideOnOverlayClicked ref={ref => this.dialog = ref} title="New Activity" >
        <ActivityForm {...{day, beginHour, endHour, crossDay, description, category, inputErrors,
          requestError, changeActivity, toggleCrossDay, disableSave, onSave: createActivity}}/>
      </SkyLight>

    );
  }
}

export default NewActivity;