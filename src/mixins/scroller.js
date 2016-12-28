/**
 * Created by linxiaojie on 2016/12/1.
 */
let isMove = 0
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
      if (!this.refreshPushEnable || isMove === 0) {
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
    touchEnd (e) {
      /*
      * 1. 非刷新状态并且显示正在刷新，开始刷新请求并设置不允许上拉刷新
      * 2. 非触摸移动状态，隐藏刷新指示栏
      * */
      if (!this.startRefresh && this.showRefreshPushLoading) {
        this.refreshPushEnable = false
        this.startRefresh = true
        this.$refs.container.scrollTop = rect.height + refreshBarHeight - this.height
      } else if (isMove) {
        this.showRefreshPush = false
      }
      isMove = moveDis = 0
    },
    /*
    * 刷新当前出点坐标和内容rect状态
    * */
    refreshCompute (e) {
      rect = this.$refs.content.getBoundingClientRect()
      start = {
        x: e.pageX,
        y: e.pageY
      }
    },
    widthAndHeightCoerce (v) {
      if (v[v.length - 1] !== '%') {
        return v + 'px'
      }
      return v
    },
    /*
    * 触发重新刷新
    * */
    reload (e) {
      let vm = this
      vm.showRefreshPush = true
      vm.refreshPushError = false
      vm.showRefreshPushLoading = true
      vm.startRefresh = true
    }
  },
  watch: {
    /*
    * 开始发送刷新请求
    * */
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
