import React, {Component} from 'react';
import {connect} from "react-redux"
import {dayFormat} from "../utils";
import ErrorMessages from "../common/ErrorMessages";
import {TextField, Button, FormControlLabel, Checkbox} from "@material-ui/core"
import {getCategoriesNames} from "../categories/duck";
import SuggestedTextField from "../common/SuggestedTextField";

const buttonStyle = {margin: "0.5em"};

class ActivityForm extends Component {
  changeText = e=> this.props.changeActivity(e.target.name, e.target.value);

  render() {
    let {
      day, beginHour, endHour, crossDay, description, category, inputErrors,
      changeActivity, categoryNames, requestError, toggleCrossDay, onSave, disableSave, children
    } = this.props;

    return (
      <div>
        {dayFormat(day)}

        <form>
          <TextField name="beginHour" label="Begin" autoComplete="off"
                     value={beginHour} onChange={this.changeText}/> <br/>
          <TextField name="endHour" label="End"
                     value={endHour} onChange={this.changeText}/>
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
                     value={description} onChange={this.changeText}/> <br/>

          <SuggestedTextField textProps={{name:"category", label:"Category"}}
                              value={category} options={categoryNames}
                              onChangeValue={v => changeActivity("category", v)}/> <br/>
        </form>

        <Button variant="contained" color="primary" style={buttonStyle}
                disabled={disableSave} onClick={onSave}> Save </Button>

        {children}

        <ErrorMessages errors={inputErrors.concat(requestError)}/>
      </div>
    );
  };
}

export default connect(
  state => ({categoryNames: getCategoriesNames(state)}),
)(ActivityForm);