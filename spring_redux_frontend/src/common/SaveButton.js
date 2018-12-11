import React from 'react';
import {IconButton} from "@material-ui/core";
import {Save} from "@material-ui/icons"

const SaveButton = (props) =>
  <IconButton color="inherit" {...props}>
    <Save/>
  </IconButton>
;

export default SaveButton;