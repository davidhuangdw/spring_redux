import React, {Component} from 'react';

const style={fontSize: "2em"};

class LargeText extends Component {
  render() {
    return (
      <span style={style}>
        {this.props.children}
      </span>
    );
  }
}

export default LargeText;