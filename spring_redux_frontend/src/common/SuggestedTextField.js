import React, {Component} from 'react';
import {strOrderMatch} from "../utils";
import {TextField} from "@material-ui/core";

const suggestStyle = {color: "#9068be" };

class SuggestedTextField extends Component {
  state = {focused: false};

  componentDidMount(){
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = e => {
    let suggestions, unique;
    if (!(this.state.focused && (suggestions = this.suggestions()).length === 1)) return;

    unique = suggestions[0];
    switch (e.code){
      case "Tab":
      case "ArrowRight":
        e.preventDefault();
        this.props.onChangeValue(unique);
        break;
      default:
    }
  };

  suggestions = ()=>{
    let {value, options} = this.props;
    if(!this.state.focused || value.length < 1)
      return [];
    return options.filter(option => strOrderMatch(value, option));
  };

  render() {
    let {value, onChangeValue, textProps} = this.props;

    return (
      <div>
        <TextField {...textProps} autoComplete="off"
                   onFocus={()=>this.setState({focused: true})}
                   onBlur={()=>this.setState({focused: false})}
                   value={value} onChange={e => onChangeValue(e.target.value)}
        /> <br/>

        <div style={suggestStyle}>
          {this.suggestions().map(suggest => {
            let matchIndex = strOrderMatch(value, suggest);
            return <div key={suggest}>
              {Object.keys(suggest).map(i =>
                <span key={i}> {matchIndex[i] ? <b>{suggest[i]}</b> : suggest[i]} </span>
              )}
            </div>
          })}
        </div>
      </div>
    );
  }
}

export default SuggestedTextField;