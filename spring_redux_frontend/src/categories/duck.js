import {createSelector} from 'reselect'
import axios from "axios"
import {idModelFromList, listToIndexHash} from "../utils";

// action types:
const CATEGORIES_API_FAIL = "CATEGORIES_API_FAIL";
const CATEGORIES_API_PENDING = "CATEGORIES_API_PENDING";
const CATEGORIES_FETCH_SUCC = "CATEGORIES_FETCH_SUCC";
const CATEGORY_POST_SUCC = "CATEGORY_POST_SUCC";
const CATEGORY_PATCH_SUCC = "CATEGORY_PATCH_SUCC";
const CATEGORY_DELETE_SUCC = "CATEGORY_DELETE_SUCC";
const CATEGORIES_CACHED = "CATEGORIES_CACHED"


// action creators:
const doCache = () => ({type: CATEGORIES_CACHED});
const removeCache = () => ({type: CATEGORIES_CACHED, removeCache: true});
export const doRefreshCategories = () => dispatch => {
  dispatch(removeCache());
  dispatch(doCategoriesFetchAll())
};

const doCategoryFetchAllPending = () =>({type: CATEGORIES_API_PENDING, apiType: 'fetchAll'});
const doCategoryFetchAllFail = error => ({type: CATEGORIES_API_FAIL, apiType: 'fetchAll', error: error });
const doCategoryFetchAllSucc = categories => ({type: CATEGORIES_FETCH_SUCC, categories});
export const doCategoriesFetchAll = () => (dispatch, getState) => {
  if(getCached(getState())) return;

  dispatch(doCategoryFetchAllPending());
  return axios.get("/categories")
    .then(
      payload => {
        dispatch(doCategoryFetchAllSucc(payload.data._embedded.categories));
        dispatch(doCache());
      },
      error => dispatch(doCategoryFetchAllFail(error.message))
    )
};

const doCategoryPostPending = () =>({type: CATEGORIES_API_PENDING, apiType: 'post'});
const doCategoryPostFail = error => ({type: CATEGORIES_API_FAIL, apiType: 'post', error: error });
const doCategoryPostSucc = category => ({type: CATEGORY_POST_SUCC, category});
export const doCategoriesPost = category => dispatch => {
  dispatch(doCategoryPostPending());
  return axios.post("/categories", category)
    .then(
      payload => dispatch(doCategoryPostSucc(payload.data)),
      error => dispatch(doCategoryPostFail(error.message))
    )
};

const doCategoryPatchPending = () =>({type: CATEGORIES_API_PENDING, apiType: 'patch'});
const doCategoryPatchFail = error => ({type: CATEGORIES_API_FAIL, apiType: 'patch', error: error });
const doCategoryPatchSucc = category => ({type: CATEGORY_PATCH_SUCC, category});
export const doCategoriesPatch = category => dispatch => {
  dispatch(doCategoryPatchPending());
  return axios.patch(`/categories/${category.id}`, category)
    .then(
      payload => dispatch(doCategoryPatchSucc(payload.data)),
      error => dispatch(doCategoryPatchFail(error.message))
    )
};

const doCategoryDeletePending = () =>({type: CATEGORIES_API_PENDING, apiType: 'deleteStatus'});
const doCategoryDeleteFail = error => ({type: CATEGORIES_API_FAIL, apiType: 'deleteStatus', error: error });
const doCategoryDelteSucc = categoryId => ({type: CATEGORY_DELETE_SUCC, categoryId});
export const doCategoriesDelete = id => dispatch => {
  dispatch(doCategoryDeletePending());
  return axios.delete(`/categories/${id}`)
    .then(
      payload => dispatch(doCategoryDelteSucc(id)),
      error => dispatch(doCategoryDeleteFail(error.message))
    )
};


// selectors:
export const getCategoriesState = states => states.categoriesState;
export const getCategoryModel = createSelector(getCategoriesState, state => state.model);
export const getCategoryFetchAll = createSelector(getCategoriesState, state => state.fetchAll);
export const getCategoryPost = createSelector(getCategoriesState, state => state.post);
export const getCategoryPatch = createSelector(getCategoriesState, state => state.patch);
export const getCategoryDelete = createSelector(getCategoriesState, state => state.deleteStatus);
export const getCategoriesArray = createSelector(getCategoryModel, model =>
  Object.keys(model).map(k => model[k]).sort((a,b) => a.name.localeCompare(b.name)));
export const getCategoriesByName = createSelector(getCategoriesArray, list => listToIndexHash(list, c => c.name));

const getCached = createSelector(getCategoriesState, s => s.cached);
export const getCategoryApiPendings = createSelector(getCategoryFetchAll, getCategoryPost, getCategoryPatch, getCategoryDelete,
  (...statues)=>statues.map(s => s.pending));

// state:
const initialState = {
  model:{}, // id as key

  // api status:
  fetchAll:{},
  post:{},
  patch:{},
  deleteStatus:{},

  cached: false,
};


// reducer:
export default function reducer(state=initialState, action){
  let {model, fetchAll, post, patch, deleteStatus} = state;
  let {type, apiType, error, removeCache, categories, category, categoryId} = action;
  let apiStatus;

  switch (type) {
    case CATEGORIES_CACHED:
      return {...state, cached: !removeCache};

    case CATEGORIES_FETCH_SUCC:
      let {newModel} = idModelFromList(categories, {model});
      model = newModel;
      fetchAll = {...fetchAll, pending: false, error: null};
      return {...state, model, fetchAll};

    case CATEGORY_POST_SUCC:
      model = {...model, [category.id]: category};
      post = {...post, pending: false, error: null};
      return {...state, model, post};

    case CATEGORY_PATCH_SUCC:
      model = {...model, [category.id]: category};
      patch = {...patch, pending: false, error: null};
      return {...state, model, patch};

    case CATEGORY_DELETE_SUCC:
      delete model[categoryId];
      deleteStatus = {...deleteStatus, pending: false, error: null};
      return {...state, model, deleteStatus};

    case CATEGORIES_API_FAIL:
      apiStatus = state[apiType];
      apiStatus = {...apiStatus, pending: false, error};
      return {...state, [apiType]: apiStatus};

    case CATEGORIES_API_PENDING:
      apiStatus = state[apiType];
      apiStatus = {...apiStatus, pending: true, error: null};
      return {...state, [apiType]: apiStatus};

    default:
      return state;
  }
}