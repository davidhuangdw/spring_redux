import React, {Component} from 'react';
import {Autorenew} from "@material-ui/icons"
import {IconButton} from "@material-ui/core"

class SpinRefreshButton extends Component {
  render() {
    let {spin, onClick} = this.props;
    let className = spin ? "spin-logo" : "";
    let disabled = spin || !onClick;

    return <IconButton color="inherit" {...{disabled, onClick}}>
      <Autorenew className={className} />
    </IconButton>
  }
}

export default SpinRefreshButton;