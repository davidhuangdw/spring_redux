import React, { Component } from 'react';
import {hot} from "react-hot-loader"
import {MuiThemeProvider} from "@material-ui/core"
import {Provider} from "react-redux"
import store from "./store"
import './App.css';
import {MyTheme} from './constants'
import {MyAppBar} from "./components"
import Activities from "./activities/Activities"


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={MyTheme}>
          <div className="App">

            <MyAppBar title="My App"/>
            <Activities/>

          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

// export default App;
export default hot(module)(App)
