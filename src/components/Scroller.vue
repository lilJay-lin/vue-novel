<template>
  <div class="scroll_container" :id="containerId"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      ref="container">
    <div class="scroll_content" :id="contentId" ref="content">
      <slot></slot>
    </div>
    <div class="refresh-push" v-if="refreshPushEnable">
      <template v-if="startRefreshPushLoading">
        <p>刷新数据，请稍后</p>
      </template>
      <template v-else>
        <p>上拉刷新</p>
      </template>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import scrollerMixins from '../mixins/scroller'
  export default {
    mixins: [scrollerMixins],
    props: {
      containerId: {
        type: String,
        default () {
          return 'outer-' + Math.random().toString(36).substring(3, 8)
        }
      },
      contentId: {
        type: String,
        default () {
          return 'inner-' + Math.random().toString(36).substring(3, 8)
        }
      },
      width: {
        type: String,
        default () {
          let doc = document.documentElement
          return doc.clientWidth.toString()
        }
      },
      height: {
        type: String,
        default () {
          let doc = document.documentElement
          return doc.clientHeight.toString()
        }
      },
      startLoadingData: Function
    },
    data () {
      return {
        offsetWidth: 0,
        offsetHeight: 0,
        refreshPushEnable: false,
        startRefreshPushLoading: false
      }
    },
    computed: {
      containerWidth () {
        let vm = this
        return vm.widthAndHeightCoerce(vm.width)
      },
      containerHeight () {
        let vm = this
        return vm.widthAndHeightCoerce(vm.height)
      }
    },
    mounted () {
      let vm = this
      let $container = vm.$refs.container
      $container.style.width = vm.containerWidth
      $container.style.height = vm.containerHeight
      let rect = $container.getBoundingClientRect()
      this.offsetWidth = rect.width
      this.offsetHeight = rect.height
    }
  }
</script>
