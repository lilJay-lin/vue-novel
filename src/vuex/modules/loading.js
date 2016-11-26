/**
 * Created by linxiaojie on 2016/11/24.
 */
import * as types from '../mutation-types.js'
const state = {
  status: false,
  success: false,
  error: null
}

const mutations = {
  [types.START_LOADING] (state) {
    state.status = true
    state.success = false
    state.error = null
  },
  [types.LOADING_ERROR] (state, error) {
    state.status = false
    state.success = false
    state.error = error
  },
  [types.LOADING_SUCCESS] (state) {
    state.status = false
    state.success = true
    state.error = null
  }
}

export default {
  state,
  mutations
}
