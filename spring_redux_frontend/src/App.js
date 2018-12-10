import React, { Component } from 'react';
import {hot} from "react-hot-loader"
import {MuiThemeProvider} from "@material-ui/core"
import {Provider} from "react-redux"
import CssBaseline from '@material-ui/core/CssBaseline'

import store from "./store"
import './App.css';
import {MyTheme} from './constants'
import MyAppBar from "./view/MyAppBar"
import ActivitiesPage from "./activities/ActivitiesPage"


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CssBaseline />
        <MuiThemeProvider theme={MyTheme}>
          <div className="App">

            <MyAppBar/>
            <ActivitiesPage/>

          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

// export default App;
export default hot(module)(App)
