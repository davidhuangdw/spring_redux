import React, {Component} from 'react';
import {Grid, TextField, IconButton} from "@material-ui/core"
import {Save, AddCircle} from "@material-ui/icons"
import ErrorMessages from "../common/ErrorMessages";

const DESCRIPTION_WIDTH = "20em";
const COLOR_CIRCLE_SIZE = "4em";
const containerStyle = {
  display: "flex",
  alignItems: "flex-start",
  minHeight: "7em",
};
const circleStyle = color => ({
  borderRadius: "50%",
  height: COLOR_CIRCLE_SIZE,
  width: COLOR_CIRCLE_SIZE,
  backgroundColor: color,
  margin: "0 0.5em",
});

const initialState = {name: "", description: "", color: ""};

class Category extends Component {
  constructor({category}){
    super();
    this.state = initialState;
    if(category) this.state = {...this.state, ...category};
  }

  changeText = e =>{
    this.setState({[e.target.name]: e.target.value})
  };

  findErrors = ()=>{
    let {name, color} = this.state;
    let {conflictName, category} = this.props;
    let err = {};
    if(!color) err.color = "Color is required";
    if(!name)
      err.name = "Name is required";
    else if(conflictName(name, category))
      err.name = `${name} already exist`;
    return err;
  };

  textProps = (propName, err)=>({
    key: propName,
    label: propName,
    name: propName,
    value: this.state[propName],
    onChange: this.changeText,
    error: !!err,
    helperText: err,
    // multiline: propName === "description",
    variant: "outlined",
    autoComplete: "off",
    InputLabelProps: { shrink: true },
    style:  {
      width:  propName === "description" ? DESCRIPTION_WIDTH : undefined,
      margin: "0 0.5em"
    },
  });

  noChange = () => !['name', 'description', 'color'].find(k => this.props.category[k] !== this.state[k]);

  save = () =>{
    this.props.saveCategory(this.state);
    this.setState({requested: true});
    if(this.props.isCreate)
      this.setState(initialState);
  };
  isPending = () => this.state.requested && this.props.saveStatus.pending;
  requestError = ()=> this.state.requested ? this.props.saveStatus.error : null;

  render() {
    let errors = this.findErrors();
    let hasError = Object.keys(errors).length > 0;
    let savable = !(this.noChange() || hasError || this.isPending());
    let requestError = this.requestError();
    let SaveIcon = this.props.isCreate ? AddCircle : Save;

    return (
      <Grid item xs={12} container>
        <Grid item xs={1} className="flex-spacing-container flex-align-start">
          <div/>
          <IconButton color="primary" disabled={!savable} onClick={this.save}> <SaveIcon/> </IconButton>
        </Grid>

        <Grid item xs={11} style={containerStyle} >
          {["name", "description", "color"].map(k =>
            <TextField {...this.textProps(k, errors[k])} />
          )}
          <div style={circleStyle(this.state.color)} />

          {requestError && <ErrorMessages errors={requestError} />}

        </Grid>
      </Grid>
    );
  }
}

export default Category;