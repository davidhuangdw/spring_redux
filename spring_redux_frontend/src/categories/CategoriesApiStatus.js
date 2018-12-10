import {connect} from "react-redux";
import ApiStatus from "../common/ApiStatus";
import {doRefreshCategories, getCategoryApiPendings} from "./duck";

const CategoryApiStatus = connect(
  state => ({ pendings: getCategoryApiPendings(state), }),
  dispatch => ({ doRefresh: () => dispatch(doRefreshCategories()) })
)(ApiStatus);

export default CategoryApiStatus;