import React, {Component} from 'react';
import SkyLight from "react-skylight";
import {TextField, Button} from "@material-ui/core"

import {buildActivityPayload, debug, hourTimeFormat, validateActivityRequestBody} from "../utils";
import ErrorMessages from "../components/ErrorMessages";

class NewActivity extends Component {
  constructor(props){
    super(props);
    this.state = {beginHour: "", endHour: ""};
  }

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

  hideAfterFulfilled = ()=>{ if(this.isFulfilled()) this.dialog.hide(); };

  isPending = () => this.state.requested && this.props.postStatus.pending;
  rejectedError = ()=> this.state.requested ? this.props.postStatus.error : null;
  isFulfilled = () => this.state.requested && !(this.isPending() || this.rejectedError());

  render() {
    let {beginHour, endHour, description, category} = this.state;
    let {day} = this.props;
    let errors = validateActivityRequestBody({beginHour, endHour, description, category});

    return (
      <SkyLight hideOnOverlayClicked ref={ref => this.dialog = ref} title="New Activity" >
        {day.format('ll')}

        <form>
          <TextField name="beginHour" label="Begin"
                     value={beginHour} onChange={this.changeText}/> <br/>
          <TextField name="endHour" label="End"
                     value={endHour} onChange={this.changeText}/> <br/>
          <TextField name="description" label="Description" multiline
                     value={description} onChange={this.changeText}/> <br/>
          <TextField name="category" label="Category"
                     value={category} onChange={this.changeText}/> <br/>
        </form>

        <Button variant="contained" color="primary" style={{margin: "0.5em"}}
                disabled={errors.length>0 || this.isPending()} onClick={this.createActivity}> Create </Button>

        <ErrorMessages errors={errors}/>

        {this.rejectedError() && <ErrorMessages errors={[this.rejectedError()]}/>}
      </SkyLight>

    );
  }
}

export default NewActivity;