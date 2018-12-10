import React, {Component} from 'react';
import {connect} from "react-redux";
import {doRefreshActivities, getActivityApiPendings} from "./duck";
import SpinRefreshButton from "../common/SpinRefreshButton";

class ActivitiesApiPending extends Component {
  render() {
    let {pendings, refresh} = this.props;
    let spin = !!pendings.find(p => p);

    return <SpinRefreshButton spin={spin} onClick={refresh} />
  }
}

export default connect(
  state => ({ pendings: getActivityApiPendings(state) }),
  dispatch => ({ refresh: () => dispatch(doRefreshActivities()) })
)(ActivitiesApiPending);