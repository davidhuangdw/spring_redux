import React, {Component} from 'react';
import {hot} from "react-hot-loader"
import {MuiThemeProvider} from "@material-ui/core"
import {Provider} from "react-redux"
import CssBaseline from '@material-ui/core/CssBaseline'
import {BrowserRouter as Router, Route} from "react-router-dom"

import store from "./store"
import './App.css';
import {MyTheme, PATH_ACTIVITIES, PATH_CATEGORIES} from './constants'
import CategoriesPage from "./categories/CategoriesPage";
import ActivitiesPage from "./activities/ActivitiesPage";


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CssBaseline />
        <MuiThemeProvider theme={MyTheme}>
          <Router>
            <div className="App">

              <Route exact path="/" component={ActivitiesPage} />
              <Route exact path={PATH_ACTIVITIES} component={ActivitiesPage} />
              <Route exact path={PATH_CATEGORIES} component={CategoriesPage} />

            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

// export default App;
export default hot(module)(App)
