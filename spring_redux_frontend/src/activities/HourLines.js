import React from 'react';
import {nextKHours} from "../utils";
import Grid from "@material-ui/core/Grid/Grid";
import {HOUR_HEIGHT} from "../constants";

const HourLines = ({day, showNewActivity}) => {
  return (nextKHours(day, 24).map(h =>
      <Grid key={h} item xs={12}
            onDoubleClick={e => showNewActivity(h)}
            style={{height: `${HOUR_HEIGHT-0.1}em`, borderTop:"0.1em dashed #888"}}>
      </Grid>
  ));
};

export default HourLines;