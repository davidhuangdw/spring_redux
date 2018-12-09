import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import {hourTimeFormat, nextKHours} from "../utils";
import {HOUR_HEIGHT} from "../constants";

const style = {textAlign: "right", paddingRight:"10px"};
const hourStyle = {height: `${HOUR_HEIGHT}em`};

const HourTexts = ({day, makeOnDoubleClickHour, xsWidth=1}) => {
  return (
    <Grid container item xs={xsWidth} style={style}>
      {nextKHours(day, 24).map(h =>
        <Grid key={h} item xs={12}
              onDoubleClick={makeOnDoubleClickHour(h)}
              style={hourStyle}>
          {hourTimeFormat(h)}
        </Grid>
      )}
    </Grid>
  );
};

export default HourTexts;