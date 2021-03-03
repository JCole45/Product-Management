import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productReducer} from './reducers/productReducers'

const reducer = combineReducers({product: productReducer})

const middleware = [thunk]

const storageItemsFromStorage = localStorage.getItem('storePharmacyProducts') ? JSON.parse(localStorage.getItem('storePharmacyProducts')) : []

const initialState = {product: {products: storageItemsFromStorage}}

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store