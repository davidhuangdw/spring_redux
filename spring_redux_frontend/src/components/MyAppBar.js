import React from "react"
import {AppBar, Toolbar, Typography, IconButton, } from "@material-ui/core"
import {Menu} from "@material-ui/icons"

export default function MyAppBar(props){
  let {title} = props
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu"> <Menu color="inherit"/> </IconButton>
        <Typography variant="h5" color="inherit"> {title} </Typography>
      </Toolbar>
    </AppBar>
  );
}