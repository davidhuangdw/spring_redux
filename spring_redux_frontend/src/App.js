import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {hot} from "react-hot-loader"

class App extends Component {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

// export default App;
export default hot(module)(App)
