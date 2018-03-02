import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import OpenReadCont from '../containers/OpenReadCont'
import Filebrowser from './Filebrowser.js'
import * as OpenReadAction from '../actions/OpenReadAction';
import {configureStore}  from '../store/configureStore.js'

// At first dispatch a Get Todos Actions, So we'll recieve the Todos 
// fetched from the server at the start of the app

const store = configureStore();
 //console.log(store);
class App extends Component {
  constructor() {
    super();
  }
  render = () => {
    return (
      <Provider  store={store}>
        <OpenReadCont />
      </Provider>
    );
  }
}

export default App;