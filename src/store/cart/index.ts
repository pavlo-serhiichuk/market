import {IProduct} from '../../models/IProduct'
import {CartActionType, CartEnum, ICartState, SetCartAction} from './types'
import {AppDispatch} from '../index'
import {preorderAPI, productsAPI} from '../../api/api'

const initialState: ICartState = {
  cart: [] as IProduct[],
}

export default function cartReducer(state = initialState, action: CartActionType) {
  switch (action.type) {
    case CartEnum.CART:
      return {...state, cart: action.payload}
    default:
      return {...state}
  }
}

export const CartActionCreators = {
  setCart: (cart: IProduct[]): SetCartAction => ({type: CartEnum.CART, payload: cart}),
  loadCart: () => async (dispatch: AppDispatch) => {
    const productsURL = localStorage.getItem('cart_ids')?.split(',').join('&id=')

    if (productsURL) {
      const response = await preorderAPI.getPreorderProducts(productsURL)
      dispatch(CartActionCreators.setCart(response.data))
    }
  },
  addCartId: (id: number) => async (dispatch: AppDispatch) => {
    const cartId = (id).toString()
    const cartIds: string | null = localStorage.getItem('cart_ids')

    if (cartIds) {
      if (cartIds.indexOf(cartId) >= 0) {
        return false
      }

      const newCardIds = `${cartIds},${cartId}`
      localStorage.setItem('cart_ids', `${newCardIds}`)

      const productsURL = newCardIds.split(',').join('&id=')
      const response = await productsAPI.getCartProduct(productsURL)
      dispatch(CartActionCreators.setCart(response.data))

    } else {
      localStorage.setItem('cart_ids', cartId)
      const response = await productsAPI.getCartProduct(cartId)
      dispatch(CartActionCreators.setCart(response.data))
    }
  }
}
