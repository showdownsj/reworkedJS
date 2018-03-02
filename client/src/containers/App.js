import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import OpenReadContainer from './OpenReadContainer'

import * as OpenReadAction from '../actions/OpenReadAction';
import {configureStore}  from '../store/configureStore'


const store = configureStore();

class App extends Component {
  constructor() {
    super();
  }
  render = () => {
    return (
      <Provider  store={store}>
        <OpenReadContainer />
      </Provider>
    );
  }
}

export default App;