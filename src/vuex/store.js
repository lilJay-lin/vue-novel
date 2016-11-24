/**
 * Created by linxiaojie on 2016/11/21.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import book from './modules/book.js'
import loading from './modules/loading.js'
import createLogger from '../../node_modules/vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    book,
    loading
  },
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
