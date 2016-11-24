/**
 * Created by linxiaojie on 2016/11/24.
 */
import * as types from '../mutation-types.js'

export const startLoading = ({commit}) => {
  commit(types.START_LOADING)
}

export const loadingError = ({commit}, error) => {
  commit(types.LOADING_ERROR, error)
}

export const loadingSuccess = ({commit}, success) => {
  commit(types.LOADING_SUCCESS)
}
