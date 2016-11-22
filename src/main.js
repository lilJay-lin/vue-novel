import Vue from 'vue'
import App from './App'
import store from './vuex/store'

require('./assets/scss/materialize.config.scss')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
