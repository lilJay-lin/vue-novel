<template>
  <div class="scroll_container" :id="containerId"
       @touchstart="touchStart"
       @touchmove="touchMove"
       @touchend="touchEnd"
       ref="container">
    <div class="refresh-push" v-if="showRefreshPull">
      <template v-if="refreshError">
        <p @click="reload">数据加载失败，点击重试</p>
      </template>
      <template  v-if="refreshRefreshLoading">
        <p >数据加载中，请稍后</p>
      </template>
      <template v-if="!(refreshRefreshLoading || refreshError)">
        <p>上拉刷新</p>
      </template>
    </div>
    <div class="scroll_content" :id="contentId" ref="content">
      <slot></slot>
    </div>
    <div class="refresh-push" v-if="showRefreshPush">
      <template v-if="refreshError">
        <p @click="reload">数据加载失败，点击重试</p>
      </template>
      <template  v-if="refreshRefreshLoading">
        <p >数据加载中，请稍后</p>
      </template>
      <template v-if="!(refreshRefreshLoading || refreshError)">
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
        refreshEnable: true,
        showRefreshPush: false,
        refreshRefreshLoading: false,
        startRefresh: false,
        refreshError: false,
        showRefreshPull: false
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
