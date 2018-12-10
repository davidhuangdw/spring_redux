import React, {Component} from 'react';
import {Grid} from "@material-ui/core"

class Category extends Component {
  render() {
    let {category} = this.props;
    return (
      <Grid item container>
        {JSON.stringify(category)}
      </Grid>
    );
  }
}

export default Category;