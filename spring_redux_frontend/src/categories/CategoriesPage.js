import React, {Component} from 'react';
import {connect} from "react-redux"
import {Grid} from "@material-ui/core"

import {
  doCategoriesFetchAll,
  doCategoriesPatch,
  doCategoriesPost,
  getCategoriesArray,
  getCategoryDelete, getCategoryPatch,
  getCategoryPost
} from "./duck";
import Category from "./Category";
import MyAppBar from "../view/MyAppBar";
import CategoriesApiStatus from "./CategoriesApiStatus"
import LargeText from "../common/LargeText";


class CategoriesPage extends Component {
  componentDidMount(){
    this.props.doFetchAll();
  }

  conflictName= (name, category)=> {
    let found = this.props.categories.find(c => c.name.toLowerCase() === name.toLowerCase());
    return found && found!==category;
  };

  createProps = () => ({
    key: "create",
    isCreate: true,
    category: {},
    conflictName: this.conflictName,
    saveCategory: this.props.doPost,
    saveStatus: this.props.postStatus,
  });

  editProps = category => ({
    key: category.id,
    category: category,
    conflictName: this.conflictName,
    saveCategory: this.props.doPatch,
    saveStatus: this.props.patchStatus,
    deleteStatus: this.props.deleteStatus,
  });

  render() {
    let {categories} = this.props;

    return (
      <div>
        <MyAppBar>
          <LargeText> Categories </LargeText>
          <CategoriesApiStatus />
        </MyAppBar>

        <Grid container className="content">
          <Category {...this.createProps()} />
          {categories.map(category =>
            <Category {...this.editProps(category)} />
          )}
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    categories: getCategoriesArray(state),
    postStatus: getCategoryPost(state),
    patchStatus: getCategoryPatch(state),
    deleteStatus: getCategoryDelete(state),
  }),
  dispatch => ({
    doFetchAll: () => dispatch(doCategoriesFetchAll()),
    doPatch: category => dispatch(doCategoriesPatch(category)),
    doPost: category => dispatch(doCategoriesPost(category)),
  }),
)(CategoriesPage);