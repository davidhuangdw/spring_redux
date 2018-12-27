import React, {Component} from 'react';
import {
  buildActivityPayload, hourTimeFormat, isSameDay, startOfDay,
  validateActivityRequestBody,
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
        if(this.savable()) this.patchActivity();
        break;
      default:
    }
  };

  visible = () => this.dialog.state.isVisible;

  getDay = () => startOfDay(this.activity.from);

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
    this.props.doPatchActivity(activity)
      .then(this.reloadAfterFulfilled);
    this.setState({requested: true});
  };

  noValueChanged = () =>{
    let activity = parseActivityModel(this.activity);
    return !['beginHour', 'endHour', 'crossDay', 'description', 'category'].find(k => activity[k] !== this.state[k]);
  };

  reloadAfterFulfilled = () => {
    if(this.isFulfilled()){
      this.activity= this.props.getActivity(this.activity.id);
      this.setState({requested: false});
    }
  };

  isPending = () => this.state.requested && this.props.patchStatus.pending;
  requestError = ()=> this.state.requested ? this.props.patchStatus.error : null;
  isFulfilled = () => this.state.requested && !(this.isPending() || this.requestError());
  savable = () => !(this.isPending() || this.noValueChanged() || validateActivityRequestBody(this.state).length>0);

  renderForm = () => {
    if(!this.activity) return null;

    let {beginHour, endHour, crossDay, description, category} = this.state;
    let day = this.getDay();
    let {changeActivity, toggleCrossDay, patchActivity} = this;

    let inputErrors = validateActivityRequestBody(this.state);
    let requestError = this.requestError();
    let disableSave =  !this.savable();

    return <ActivityForm {...{
      day, beginHour, endHour, crossDay, description, category, inputErrors,
      requestError, changeActivity, toggleCrossDay, disableSave,
      onSave: patchActivity
    }}/>
  };

  render = () => <SkyLight hideOnOverlayClicked ref={ref => this.dialog = ref} title="Edit Activity" >
    {this.renderForm()}
  </SkyLight>
}

export default EditActivity;