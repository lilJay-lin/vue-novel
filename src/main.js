import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'

require('./assets/scss/materialize.config.scss')

/* eslint-disable no-new */
new Vue({
  store,
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
