import {
  ProductActionType,
  ProductEnum,
  ProductState,
  SetCategoryAction,
  SetCurrentProductAction,
  SetErrorAction,
  SetLoadingAction, SetPagesAction,
  SetProductsAction
} from './types'
import {IProduct} from '../../models/IProduct'
import {AppDispatch} from '../index'
import {productsAPI, productsLimit} from '../../api/api'


const initialState: ProductState = {
  products: [] as IProduct[],
  currentProduct: {} as IProduct,
  category: '',
  isLoading: false,
  error: null,
  pages: 1,
}

const productReducer = (state = initialState, action: ProductActionType) => {
  switch (action.type) {
    case ProductEnum.SET_PRODUCTS:
      return {...state, products: action.payload}
    case ProductEnum.SET_CURRENT_PRODUCT:
      return {...state, currentProduct: action.payload}
    case ProductEnum.SET_CATEGORY:
      return {...state, category: action.payload}
    case ProductEnum.SET_LOADING:
      return {...state, isLoading: action.payload}
    case ProductEnum.SET_ERROR:
      return {...state, error: action.payload}
    case ProductEnum.SET_PAGES:
      return {...state, pages: action.payload}
    default:
      return {...state}
  }
}

export const ProductActionCreators = {
  setProducts: (products: IProduct[]): SetProductsAction => ({type: ProductEnum.SET_PRODUCTS, payload: products}),
  setCurrentProduct: (product: IProduct): SetCurrentProductAction => ({
    type: ProductEnum.SET_CURRENT_PRODUCT,
    payload: product
  }),
  setCategory: (category: string): SetCategoryAction => ({type: ProductEnum.SET_CATEGORY, payload: category}),
  setLoading: (isLoading: boolean): SetLoadingAction => ({type: ProductEnum.SET_LOADING, payload: isLoading}),
  setError: (error: string): SetErrorAction => ({type: ProductEnum.SET_ERROR, payload: error}),
  setPages: (pages: number): SetPagesAction => ({type: ProductEnum.SET_PAGES, payload: pages}),
  loadProducts: (category: string) => async (dispatch: AppDispatch) => {

    dispatch(ProductActionCreators.setLoading(true))
    setTimeout(async () => {
      try {
        let response = await productsAPI.getProducts(category)
        dispatch(ProductActionCreators.setProducts(response.data))
        dispatch(ProductActionCreators.setPages(Math.ceil(+response.headers["x-total-count"] / productsLimit)))
      } catch (e: any) {
        dispatch(ProductActionCreators.setError(e.message))
      } finally {
        dispatch(ProductActionCreators.setLoading(false))
      }
    }, 500)
  },
  showMore: (category: string, loadedProducts: IProduct[], page: number) => async (dispatch: AppDispatch) => {
    setTimeout(async () => {
      try {
        let response = await productsAPI.getProducts(category, page)
        console.log([...loadedProducts, response.data])
        dispatch(ProductActionCreators.setProducts([...loadedProducts, ...response.data]))

      } catch (e: any) {
        dispatch(ProductActionCreators.setError(e.message))
      } finally {
      }
    }, 600)
  },
  loadCurrentProduct: (category: string, productId: number) => async (dispatch: AppDispatch) => {
    dispatch(ProductActionCreators.setLoading(true))
    setTimeout(async () => {
      try {
        let response = await productsAPI.getCurrentProduct(category, productId)
        dispatch(ProductActionCreators.setCurrentProduct(response.data[0]))
      } catch (e: any) {
        dispatch(ProductActionCreators.setError(e.message))
      } finally {
        dispatch(ProductActionCreators.setLoading(false))
      }
    }, 1000)
  },
}


export default productReducer