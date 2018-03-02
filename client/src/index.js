import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './Components/App.js';  
import './index.css';




render(
  <div>
    <App />
  </div>,
  document.getElementById('root')
)