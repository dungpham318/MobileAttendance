import React, { Component } from 'react'
import './App.css';

import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import routes from './routes';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from './redux/reducers';
import rootSaga from './redux/middleware/saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();

export let store = createStore(
  allReducers,
  applyMiddleware(sagaMiddleware),
);
function App() {
  const routing = useRoutes(routes);
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider>
          {routing}
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;


sagaMiddleware.run(rootSaga);
