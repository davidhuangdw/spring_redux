import React, {Component} from 'react';
import {connect} from "react-redux";
import {doRefreshActivities, getPendings} from "./duck";
import SpinRefreshButton from "../components/SpinRefreshButton";

class ActivitiesApiPending extends Component {
  render() {
    let {pendings, refresh} = this.props;
    let spin = !!pendings.find(p => p);

    return <SpinRefreshButton spin={spin} onClick={refresh} />
  }
}

export default connect(
  state => ({ pendings: getPendings(state) }),
  dispatch => ({ refresh: () => dispatch(doRefreshActivities()) })
)(ActivitiesApiPending);