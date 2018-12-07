import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import {hourTimeFormat, nextKHours} from "../utils";
import {HOUR_HEIGHT} from "../constants";



const HourTexts = ({day, xsWidth=1}) => {
  return (
    <Grid container item xs={xsWidth} style={{textAlign: "right", paddingRight:"10px"}}>
      {nextKHours(day, 24).map(h =>
        <Grid key={h} item xs={12} style={{height: `${HOUR_HEIGHT}em`}}>
          {hourTimeFormat(h)}
        </Grid>
      )}
    </Grid>
  );
};

export default HourTexts;