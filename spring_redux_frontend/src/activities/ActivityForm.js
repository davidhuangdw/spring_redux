import React from 'react';
import {dayFormat} from "../utils";
import ErrorMessages from "../components/ErrorMessages";
import {TextField, Button} from "@material-ui/core"

const ActivityForm = ({day, beginHour, endHour, description, category, inputErrors,
                        pending, requestError, changeText, onSave, disableSave, children}) => {
  return (
    <div>
      { dayFormat(day) }

      <form>
        <TextField name="beginHour" label="Begin"
                   value={beginHour} onChange={changeText}/> <br/>
        <TextField name="endHour" label="End"
                   value={endHour} onChange={changeText}/> <br/>
        <TextField name="description" label="Description" multiline
                   value={description} onChange={changeText}/> <br/>
        <TextField name="category" label="Category"
                   value={category} onChange={changeText}/> <br/>
      </form>

      <Button variant="contained" color="primary" style={{margin: "0.5em"}}
              disabled={disableSave} onClick={onSave}> Save </Button>

      {children}

      <ErrorMessages errors={inputErrors.concat(requestError)}/>
    </div>
  );
};

export default ActivityForm;