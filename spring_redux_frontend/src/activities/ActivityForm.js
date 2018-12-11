import React from 'react';
import {dayFormat} from "../utils";
import ErrorMessages from "../common/ErrorMessages";
import {TextField, Button, FormControlLabel, Checkbox} from "@material-ui/core"

const buttonStyle = {margin: "0.5em"};

const ActivityForm = ({day, beginHour, endHour, crossDay, description, category, inputErrors,
                        pending, requestError, changeText, toggleCrossDay, onSave, disableSave, children}) => {
  return (
    <div>
      { dayFormat(day) }

      <form>
        <TextField name="beginHour" label="Begin" autoComplete="off"
                   value={beginHour} onChange={changeText}/> <br/>
        <TextField name="endHour" label="End"
                   value={endHour} onChange={changeText}/>
        <br/>
        <FormControlLabel
          control={
            <Checkbox
              checked={crossDay}
              onChange={toggleCrossDay}
              value="crossDay"
              color="default"
            />
          }
          label="Cross Day"
        />
        <br/>
        <TextField name="description" label="Description" autoComplete="off" multiline
                   value={description} onChange={changeText}/> <br/>
        <TextField name="category" label="Category" autoComplete="off"
                   value={category} onChange={changeText}/> <br/>
      </form>

      <Button variant="contained" color="primary" style={buttonStyle}
              disabled={disableSave} onClick={onSave}> Save </Button>

      {children}

      <ErrorMessages errors={inputErrors.concat(requestError)}/>
    </div>
  );
};

export default ActivityForm;