import React, {Component} from 'react';
import SkyLight from "react-skylight";
import {Button} from "@material-ui/core"
import {dayFormat, hourTimeFormat} from "../utils";
import ErrorMessages from "../common/ErrorMessages";

class ConfirmDeleteActivity extends Component {
  state = {};

  componentDidMount(){
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = e => {
    if (!this.visible() || this.isPending()) return;
    switch (e.code){
      case "Enter":
      case "Backspace":
        this.deleteActivity();
        break;
      default:
    }
  };

  visible = () => this.dialog.state.isVisible;

  show = (activity, afterDelete) =>{
    this.afterDelete = afterDelete;
    this.setState({activity});
    this.dialog.show();
  };

  deleteActivity = ()=>{
    let {activity} = this.state;

    this.props.doDeleteActivity(activity.id)
      .then(this.afterRequest);
    this.setState({requested: true});
  };

  isPending = () => this.state.requested && this.props.deleteStatus.pending;
  requestError = ()=> this.state.requested ? this.props.deleteStatus.error : null;
  isFulfilled = () => this.state.requested && !(this.isPending() || this.requestError());
  afterRequest = ()=>{
    if(this.isFulfilled()){
      this.dialog.hide();
      this.afterDelete();
    }
  };

  render() {
    let {activity} = this.state;

    let pending = this.isPending();
    let requestError = this.requestError();

    let {from, to, category, description} = activity || {};
    let style = {margin: "1em"};
    return (
      <SkyLight hideOnOverlayClicked ref={ref => this.dialog = ref} title="Are you sure to delete?" >
        { dayFormat(this.props.day) }
        {activity &&
          <div>
            <div>
              <span> {`${hourTimeFormat(from)} - ${hourTimeFormat(to)}  [${category}]`} </span>
              <br/>
              <span> {description} </span>
            </div>

            <div>
              < Button variant="contained" color="primary" disabled={pending} style={style}
                       onClick={this.deleteActivity}> Delete </Button>
              <Button variant="contained" color="secondary" style={style}
                      onClick={() => this.dialog.hide()}> Cancel </Button>
            </div>

            <ErrorMessages errors={[requestError]}/>
          </div>
        }
      </SkyLight>
    );
  }
}

export default ConfirmDeleteActivity;