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
      if (!(this.refreshEnable || this.refreshError) || e.target.tagName.match(/input|textarea|select/i)) {
        return
      }
      isMove = 1
      e = e.touches[0]
      this.refreshCompute(e)
    },
    touchMove (e) {
      if (!(this.refreshEnable || this.refreshError) || isMove === 0) {
        return
      }
      if (e.changedTouches.length === 0) {
        return
      }
      e = e.changedTouches[0]
      let pushDis = rect.height + rect.top - this.height - (start.y - e.pageY)
      let pullDis = e.pageY - start.y + rect.top
      this.showRefreshPush = this.refreshEnable && pushDis < 0
      /*
       * TODO: 目前依赖原生scroll，下拉操作指示栏的出现，需要做特殊处理，后期可改成transform
       * */
      if (this.refreshEnable && pullDis > 0) {
        if (!this.showRefreshPull) {
          this.$refs.container.scrollTop = rect.top + refreshBarHeight
        }
        this.showRefreshPull = true
      } else {
        /*
        * 如果此刻把showRefreshPull 设置为false , 顶部拉下隐藏，回造成页面在触摸期间往上收缩比较明显
        * 等待touchEnd的时候再做隐藏
        * */
        pullDis = 0
      }
      moveDis = this.showRefreshPull ? pullDis : this.showRefreshPush ? pushDis : 0
      /*
       * 1. 上拉判断拉动的距离是否达到底部，展示底部指示 showDirect = down
       * 2. 下拉是到达顶部，展示底部指示 showDirect = up
       * */
      if (moveDis) {
        /*
         * 出现刷新提示
         * else
         * 隐藏刷新提示
         *
         * */
        if (Math.abs(moveDis) >= startLoadingDisRadio * refreshBarHeight) {
          this.refreshRefreshLoading = true
        } else {
          this.refreshRefreshLoading = false
        }
        /*
         * 滑动到达底部/顶部，更新start和rect
         * */
        if (Math.abs(moveDis) > refreshBarHeight) {
          this.refreshCompute(e)
        }
      }
    },
    touchEnd (e) {
      /*
       * 1. 非刷新状态并且显示正在刷新，开始刷新请求并设置不允许上拉刷新
       * 2. 非触摸移动状态，隐藏刷新指示栏
       */
      if (!this.startRefresh && this.refreshRefreshLoading && moveDis) {
        this.refreshEnable = false
        this.startRefresh = true
        /*
         * 显示上拉
         * */
        if (this.showRefreshPush) {
          this.$refs.container.scrollTop = rect.height + refreshBarHeight - this.height
        } else {
          this.$refs.container.scrollTop = 0
        }
      } else if (isMove) {
        /*
        * 隐藏顶部，重置scrollTop到合适位置
        * */
        if (this.showRefreshPull) {
          this.$refs.container.scrollTop = this.$refs.container.scrollTop - refreshBarHeight
        }
        this.showRefreshPush = false
        this.showRefreshPull = false
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
      vm.refreshError = false
      vm.refreshRefreshLoading = true
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
          vm.refreshEnable = true
          vm.showRefreshPush = false
          vm.showRefreshPull = false
          vm.refreshRefreshLoading = false
          vm.startRefresh = false
          vm.refreshError = false
        }, () => {
          vm.refreshEnable = false
          vm.refreshRefreshLoading = false
          vm.refreshError = true
          vm.startRefresh = false
        })
      }
    }
  }
}
