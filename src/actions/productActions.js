import axios from 'axios'
import { CREATE_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, UPDATE_PRODUCT } from "../constants/productConstants"


export const fetchProduct = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCT_REQUEST })

        const { data } = await axios.get(`http://www.mocky.io/v2/5c3e15e63500006e003e9795`)
        const {products} = data

        console.log(data)
        dispatch({
            type: FETCH_PRODUCT_SUCCESS,
            payload: products
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: FETCH_PRODUCT_FAIL,
            payload: err
        })
    }
}

export const createProduct = (productInfo) => (dispatch) => {
    dispatch({
        type: CREATE_PRODUCT,
        payload: productInfo
    })
}

export const updateProduct = (productInfo) => (dispatch) => {
    dispatch({
        type: UPDATE_PRODUCT,
        payload: productInfo
    })
}

export const deleteProduct = (id) => (dispatch) => {
    dispatch({
        type: DELETE_PRODUCT,
        payload: id
    })
}