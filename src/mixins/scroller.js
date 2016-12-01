/**
 * Created by linxiaojie on 2016/12/1.
 */

export default {
  methods: {
    touchStart (e) {
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return
      }
      console.log(e.timeStamp)
    },
    touchMove (e) {

    },
    touchEnd (e) {

    },
    widthAndHeightCoerce (v) {
      if (v[v.length - 1] !== '%') {
        return v + 'px'
      }
      return v
    }
  }
}