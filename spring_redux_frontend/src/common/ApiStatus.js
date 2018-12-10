import React, {Component} from 'react';
import SpinRefreshButton from "./SpinRefreshButton";

class ApiStatus extends Component {
  render() {
    let {pendings, doRefresh} = this.props;
    let spin = !!pendings.find(p => p);

    return <SpinRefreshButton spin={spin} onClick={doRefresh} />
  }
}

export default ApiStatus;