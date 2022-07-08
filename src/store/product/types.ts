import {IProduct} from '../../models/IProduct'

export interface ProductState {
  products: IProduct[]
  category: string
  isLoading: boolean
  error: string | null
}

export enum ProductEnum {
  SET_PRODUCTS = 'SET_PRODUCTS',
  SET_CATEGORY = 'SET_CATEGORY',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR'
}

export interface SetProductsAction {
  type: ProductEnum.SET_PRODUCTS
  payload: IProduct[]
}

export interface SetCategoryAction {
  type: ProductEnum.SET_CATEGORY
  payload: string
}


export interface SetLoadingAction {
  type: ProductEnum.SET_LOADING
  payload: boolean
}

export interface SetErrorAction {
  type: ProductEnum.SET_ERROR
  payload: string
}

export type ProductActionType =
  SetProductsAction
  | SetCategoryAction
  | SetLoadingAction
  | SetErrorAction