import { loginReducer } from "./reducers";
import { persistStore } from "redux-persist";
import persist from "./persist";
import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";

import loginSaga from "./sagas";

//WHAT?????????????????????????????????
const createSagaMiddleware = require("redux-saga").default;
const loginSagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ login: loginReducer });

const loginStore = createStore(
  persist(rootReducer),
  applyMiddleware(loginSagaMiddleware),
);

loginSagaMiddleware.run(loginSaga);

export const loginPersistor = persistStore(loginStore);
export { loginStore };
