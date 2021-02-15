import React from "react";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import PlaceNavigation from "./navigation/PlaceNavigation";
import placesReducer from "./store/reducers/placesReducer";
import { init } from "./helpers/db"; // cause we want to set up database every time we open the app;

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed");
    console.log(err);
  });
const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlaceNavigation />
    </Provider>
  );
}
