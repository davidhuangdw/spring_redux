import React from "react"
import {AppBar, Toolbar, IconButton, } from "@material-ui/core"
import {Menu} from "@material-ui/icons"
import Day from "./Day";
import ActivitiesApiPending from "../activities/ActivitiesApiPending";

export default function MyAppBar(props){
  let {title} = props;
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu"> <Menu color="inherit"/> </IconButton>
        <ActivitiesApiPending/>
        <Day />
      </Toolbar>
    </AppBar>
  );
}