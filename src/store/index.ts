import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import article from './article';
import auth from './auth'
import cart from './cart';
import product from './product'
import wishes from './wishes';
import search from './search';

const rootReducer = combineReducers({
  auth,
  product,
  article,
  cart,
  wishes,
  search
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
