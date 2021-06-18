import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter } from "react-router-dom";

import {Provider} from "react-redux";
import Reducer from './Redux/Reducer/Reducer';
import { createStore,applyMiddleware ,compose } from 'redux';
import thunk from "redux-thunk";
import { combineReducers } from 'redux';
import LoginReducer from './Redux/Reducer/LoginReducer';
import SignupReducer from './Redux/Reducer/SignupReducer';
const rootReducer=combineReducers({add:Reducer,Login:LoginReducer,Signup:SignupReducer});




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
const store =createStore( rootReducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <BrowserRouter >
  <Provider store={store}>
  <App />
  </Provider>
  </BrowserRouter>
     
 ,
  document.getElementById('root')
);


