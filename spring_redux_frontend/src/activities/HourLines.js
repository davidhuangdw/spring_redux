import React from 'react';
import {nextKHours} from "../utils";
import Grid from "@material-ui/core/Grid/Grid";
import {HOUR_HEIGHT} from "../constants";

const HourLines = ({day}) => {
  return (nextKHours(day, 24).map(h =>
      <Grid key={h} item xs={12} style={{height: `${HOUR_HEIGHT}em`, borderTop:"1px dashed #888", zIndex: -1}}>
      </Grid>
  ));
};

export default HourLines;