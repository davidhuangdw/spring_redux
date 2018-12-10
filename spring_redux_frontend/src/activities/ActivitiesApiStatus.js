import {connect} from "react-redux";
import {doRefreshActivities, getActivityApiPendings} from "./duck";
import ApiStatus from "../common/ApiStatus";

export default connect(
  state => ({ pendings: getActivityApiPendings(state) }),
  dispatch => ({ doRefresh: () => dispatch(doRefreshActivities()) })
)(ApiStatus);