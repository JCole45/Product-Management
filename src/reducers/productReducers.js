import { CREATE_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, UPDATE_PRODUCT,RESTORE_PRODUCT } from "../constants/productConstants";

const checkProducts = (products, newItem) => {
    for(var i =0; i<products.length; i++){
        if(products[i].id === newItem.id){
            return false
        }
    }
    console.log("value of i :", i)
    return true
}

export const productReducer = (state = { products: [], loading: false }, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return { products: state.products, loading: true }
        case FETCH_PRODUCT_SUCCESS:
            //return { products: [...state.products,  ...action.payload], loading: false }
            return checkProducts(state.products, action.payload) ?
                  {products: [...state.products, action.payload], loading: false}
                  :
                  {products: state.products, loading:false}
        case FETCH_PRODUCT_FAIL:
            return { products: [], loading: false, error: action.payload }


        case CREATE_PRODUCT:
            return { products: [action.payload, ...state.products], loading: false }


        case UPDATE_PRODUCT:
            return {
                products: state.products.map(product => {
                    return action.payload.id === product.id ?
                        {
                            id: action.payload.id,
                            name: action.payload.name,
                            prices: action.payload.prices.price === product.prices[0].price ? product.prices : [...product.prices, action.payload.prices]
                        }
                        :
                        product
                })
            }

        case RESTORE_PRODUCT:
            return {
                products: state.products.map(product => {
                    return action.payload === product.id ?
                    {
                        id: product.id,
                        name: product.name,
                        prices: product.prices
                    }
                    :
                    product
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
