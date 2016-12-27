/**
 * Created by linxiaojie on 2016/12/1.
 */
let isMove = 0
let loading = 0
let start = {x: 0, y: 0}
let rect = null
let moveDis = 0
let refreshBarHeight = 60
let startLoadingDisRadio = 0.8
export default {
  methods: {
    touchStart (e) {
      if (!this.refreshPushEnable || e.target.tagName.match(/input|textarea|select/i)) {
        return
      }
      isMove = 1
      e = e.touches[0]
      this.refreshCompute(e)
    },
    touchMove (e) {
      if (!this.refreshPushEnable || isMove === 0 || loading === 1) {
        return
      }
      if (e.changedTouches.length === 0) {
        return
      }
      e = e.changedTouches[0]
      moveDis = rect.height + rect.top - this.height - (start.y - e.pageY)
      if (moveDis < 0) {
        this.showRefreshPush = true
        /*
        * 出现刷新提示
        * else
        * 隐藏刷新提示
        * */
        if (Math.abs(moveDis) >= startLoadingDisRadio * refreshBarHeight) {
          this.showRefreshPushLoading = true
        } else {
          this.showRefreshPushLoading = false
        }
        /*
         * 滑动到达底部，更新start和rect
         * */
        if (Math.abs(moveDis) > refreshBarHeight) {
          this.refreshCompute(e)
        }
      } else {
        this.showRefreshPush = false
        this.showRefreshPushLoading = false
      }
    },
    refreshCompute (e) {
      rect = this.$refs.content.getBoundingClientRect()
      start = {
        x: e.pageX,
        y: e.pageY
      }
    },
    touchEnd (e) {
      if (!this.startRefresh && this.showRefreshPushLoading) {
        this.refreshPushEnable = false
        this.startRefresh = true
        this.$refs.container.scrollTop = rect.height + refreshBarHeight - this.height
      } else {
        this.showRefreshPush = false
      }
    },
    widthAndHeightCoerce (v) {
      if (v[v.length - 1] !== '%') {
        return v + 'px'
      }
      return v
    },
    reload () {
      let vm = this
      vm.showRefreshPush = true
      vm.showRefreshPushLoading = true
      vm.refreshPushError = false
      vm.startRefresh = true
    }
  },
  watch: {
    startRefresh (val) {
      if (val) {
        let vm = this
        vm.startLoadingData().then(() => {
          vm.refreshPushEnable = true
          vm.showRefreshPush = false
          vm.showRefreshPushLoading = false
          vm.startRefresh = false
          vm.refreshPushError = false
        }, () => {
          vm.refreshPushEnable = false
          vm.showRefreshPush = true
          vm.showRefreshPushLoading = false
          vm.refreshPushError = true
          vm.startRefresh = false
        })
      }
    }
  }
}
