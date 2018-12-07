import React from "react"
import {AppBar, Toolbar, Typography, IconButton, } from "@material-ui/core"
import {Menu} from "@material-ui/icons"
import Day from "../activities/Day";

export default function MyAppBar(props){
  let {title} = props;
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu"> <Menu color="inherit"/> </IconButton>
        <Day />
      </Toolbar>
    </AppBar>
  );
}