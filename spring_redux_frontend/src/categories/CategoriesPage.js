import React, {Component} from 'react';
import {connect} from "react-redux"
import {Grid} from "@material-ui/core"

import {doCategoriesFetchAll, getCategoriesArray} from "./duck";
import Category from "./Category";
import MyAppBar from "../view/MyAppBar";
import CategoriesApiStatus from "./CategoriesApiStatus"
import LargeText from "../common/LargeText";


class CategoriesPage extends Component {
  componentDidMount(){
    this.props.doFetchAll();
  }

  render() {
    let {categories} = this.props;

    return (
      <div>
        <MyAppBar>
          <LargeText> Categories </LargeText>
          <CategoriesApiStatus />
        </MyAppBar>

        <Grid container className="content">
          {categories.map(category =>
            <Category key={category.id} category={category}/>
          )}
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    categories: getCategoriesArray(state),
  }),
  dispatch => ({
    doFetchAll: () => dispatch(doCategoriesFetchAll()),
  }),
)(CategoriesPage);