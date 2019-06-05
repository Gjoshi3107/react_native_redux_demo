/**
 * @format
 */
import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';

// import configureStore from './redux/store';

import { createStore } from 'redux';
import { my_employee } from './redux/reducers';

// const rootReducer = combineReducers({
//   emp: my_employee
// });

// const configureStore = createStore(my_employee);
// const store = configureStore();


const store = createStore(my_employee);

export function getStateFromStore() {
  alert("Employee Data:- " + JSON.stringify(store.getState()));
}

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
); 
AppRegistry.registerComponent(appName, () => RNRedux);