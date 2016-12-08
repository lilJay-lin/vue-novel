/**
 * Created by linxiaojie on 2016/12/1.
 */
let isMove = 0
let loading = 0
let distance = 100
let start = {x: 0, y: 0}
let rect = null
let moveDis = 0
export default {
  methods: {
    touchStart (e) {
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return
      }
      isMove = 1
      e = e.touches[0]
      start.x = e.pageX
      start.y = e.pageY
      rect = this.$refs.content.getBoundingClientRect()
      console.dir(rect)
    },
    touchMove (e) {
      if (isMove === 0 || loading === 1) {
        return
      }
      if (e.changedTouches.length === 0) {
        return
      }
      e = e.changedTouches[0]
      moveDis = rect.height + rect.top - this.height - start.y - e.pageY
      if (moveDis < 0) {
        this.refreshPushEnable = true
        if (rect.bottom === 0) {
          this.startRefreshPushLoading = true
        }
      } else {
        this.refreshPushEnable = false
      }
    },
    touchEnd (e) {
    },
    widthAndHeightCoerce (v) {
      if (v[v.length - 1] !== '%') {
        return v + 'px'
      }
      return v
    },
    checkLoading () {
      if (isMove === 0 || loading === 1) {
        return
      }
      let rect = this.$refs.content.getBoundingClientRect()
      if (rect.height + rect.top - this.height < distance) {
        loading = 1
        isMove = 0
        this.startLoadingData().then(() => {
          loading = 0
        }).catch(() => {
          loading = 0
        })
      }
    }
  }
}
