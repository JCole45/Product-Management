import { render, screen } from '@testing-library/react';
import App from './App';
import { createProduct, updateProduct } from '../../mpharma-test/src/actions/productActions';
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './constants/productConstants'
import { v4 as uuidv4 } from 'uuid';
import { Provider } from 'react-redux'
import store from './store'
import { mount, shallow } from 'enzyme'
import CollapsibleTable from './components/CollapsibleTable'
import renderer from 'react-test-renderer';
import { productReducer } from './reducers/productReducers'


const getDate = () => {
  Date.prototype.toIsoString = function () {
    var tzo = -this.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num) {
        var norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
      };
    return this.getFullYear() +
      '-' + pad(this.getMonth() + 1) +
      '-' + pad(this.getDate()) +
      'T' + pad(this.getHours()) +
      ':' + pad(this.getMinutes()) +
      ':' + pad(this.getSeconds()) +
      dif + pad(tzo / 60) +
      ':' + pad(tzo % 60);
  }
}

describe('Table row', () => {
  test('snapshot renders', () => {
    const row = {
      name: 'Test',
      _prices: [{ id: 'id', price: 10, date: getDate() }],
      history: [{ id: 'id', price: 10, date: getDate() }],
      _id: '1',
      visible: true
    }
    const component = renderer.create(<Provider store={store}><CollapsibleTable key={'1'} visible={true} row={row} /></Provider>)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})


describe('reducer', () => {
  it('should return  the initial state', () => {
    expect(productReducer(undefined, { products: [], loading: false })).toEqual({ products: [], loading: false })
  });

  it('should handle create product', () => {
    const itemInfo = {
      id: uuidv4(),
      name: 'Test Product',
      prices: [{
        id: uuidv4(),
        price: 40,
        date: getDate()
      }]
    }

    const action = {
      type: CREATE_PRODUCT,
      payload: itemInfo
    }
    expect(productReducer({ products: [] }, action)).toEqual({loading:false, products:[itemInfo]})
  });

  it('should update product', () => {
    const id = '1_90'
    const itemInfo = {
      id: id,
      name: 'Test Product',
      prices: [{
        id: uuidv4(),
        prices: [{
          id: uuidv4(),
          price: 40,
          date: getDate()
        }],
        date: getDate()
      }]
    }

    const itemInfoUpdate = {
      id: id,
      name: 'Test Product Update',
      prices: [{
        id: uuidv4(),
        prices: [{
          id: uuidv4(),
          price: 40,
          date: getDate()
        }],
        date: getDate()
      }]
    }

    const action = {
      type: UPDATE_PRODUCT,
      payload: itemInfo
    }
    expect(productReducer({ products: [itemInfo], loading:false }, action)).toEqual({loading:false, products:[itemInfoUpdate]})
  })
})

