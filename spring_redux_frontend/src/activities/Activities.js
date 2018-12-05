import React, {Component} from  "react"
import {connect} from "react-redux"
import {getFetchAll, getActivitiesArray, doActivityFetchAll} from "../activities/duck"

class Activities extends Component{
  componentDidMount(){
    this.props.doFetchAll()
  }
  render(){
    const {getAll, activities} = this.props;
    return (<div>
      <ul>
      {activities.map((activity,i) =>
          <li
            key={`${activity.id},${i}`}> {JSON.stringify(activity)}
            <br/>
          </li>
      )}
      </ul>
    </div>);
  }
}

export default connect(
  state => ({
    fetchAll: getFetchAll(state),
    activities: getActivitiesArray(state)
  }),
  dispatch => ({
    doFetchAll: () => dispatch(doActivityFetchAll())
  })
)(Activities)





