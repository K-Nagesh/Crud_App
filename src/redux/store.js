import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reduxIndex';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const middleware = applyMiddleware(thunk, logger); // Add any other custom middleware you want to include

  const store = createStore(persistedReducer, middleware);

  const persistor = persistStore(store);
  return {store, persistor};
};

export default configureStore;
