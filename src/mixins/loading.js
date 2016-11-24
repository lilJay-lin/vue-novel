/**
 * Created by linxiaojie on 2016/11/24.
 */
import Loading from '../components/Loading'
import {mapActions} from 'vuex'
export default {
  components: {
    Loading
  },
  methods: {
    ...mapActions(['startLoading', 'loadingError', 'loadingSuccess']),
    startFetch () {
      let vm = this
      vm.startLoading()
      vm.fetchData().then(() => {
        vm.loadingSuccess()
      }, ({message}) => {
        vm.loadingError(message)
      })
    }
  },
  created () {
    this.startFetch()
  },
  watch: {
    '$route': 'startFetch'
  }
}
