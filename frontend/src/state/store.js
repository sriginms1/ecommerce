import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productListReducer, productDetailReducer } from './reducers/productReducers'

const reducers = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer
})
const initialState = {}
const middlewares = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares))) 

export default store