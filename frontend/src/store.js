import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
    productDetailsReducer,
    productListReducer,
  } from './reducers/productReducers';
  import { userSigninReducer } from './reducers/userReducers';
  import { cartReducer } from './reducers/CartReducers';
  import scannedItems from './reducers/ScannedItems'
  import {budgetSheetReducer} from './reducers/BudgetSheetReducers'
  
  const initialState = {
    userSignin: {
      userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    },
  };
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  scanned: scannedItems,
  userSignin: userSigninReducer,
  budgetSheetListing : budgetSheetReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
