import { CREATE_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, UPDATE_PRODUCT } from "../constants/productConstants";

export const productReducer = (state = { products: [], loading: false }, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return { products: [], loading: true }
        case FETCH_PRODUCT_SUCCESS:
            return { products: [action.payload], loading: false }
        case FETCH_PRODUCT_FAIL:
            return { products: [], loading: false, error: action.payload }

        
        case CREATE_PRODUCT:
            return { products: [...state.products, action.payload], loading: false }


        case UPDATE_PRODUCT:
            return {
                products: state.products.map(product => {
                    return action.payload.id === product.id ?
                        action.payload : product
                })
            }


        case DELETE_PRODUCT:
            return {
                products: state.products.map(product => {
                    return action.payload === product.id ?
                        { ...product, hidden: true } : product
                })
            }
        
        default:
            return state
    }
}