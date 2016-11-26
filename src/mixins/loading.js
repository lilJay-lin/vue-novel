/**
 * Created by linxiaojie on 2016/11/24.
 */
import Loading from '../components/Loading'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      disabledLoading: false
    }
  },
  components: {
    Loading
  },
  methods: {
    ...mapActions(['startLoading', 'loadingError', 'loadingSuccess']),
    beforeFetch () {
      return true
    },
    startFetch () {
      let vm = this
      if (vm.disabledLoading === true) {
        return
      }
      vm.beforeFetch()
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
