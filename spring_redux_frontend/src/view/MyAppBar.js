import React, {Component} from 'react';
import {AppBar, Toolbar, IconButton, } from "@material-ui/core"
import {Menu} from "@material-ui/icons"
import {NavLink} from "react-router-dom"
import {PATH_CATEGORIES, PATH_INDEX} from "../constants";
import {WatchLater, Inbox} from "@material-ui/icons"


class MyAppBar extends Component {

  render() {
    return (
      <AppBar position="fixed" color="primary">
        <Toolbar className="flex-spacing-container">

          <div className="flex">
            {/*<IconButton color="inherit" aria-label="Menu"> <Menu color="inherit"/> </IconButton>*/}
            {this.props.children}
          </div>

          <div>
            <IconButton color="inherit" component={NavLink} to={PATH_INDEX} > <WatchLater/>  </IconButton>
            <IconButton color="inherit" component={NavLink} to={PATH_CATEGORIES} > <Inbox/> </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default MyAppBar;
