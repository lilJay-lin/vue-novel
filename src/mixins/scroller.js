/**
 * Created by linxiaojie on 2016/12/1.
 */
let isMove = 0
let loading = 0
let distance = 100
export default {
  methods: {
    touchStart (e) {
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return
      }
      isMove = 1
    },
    touchMove (e) {
      this.checkLoading()
    },
    touchEnd (e) {
      this.checkLoading()
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
