<template>
  <Loading>
    <Scroller :startLoadingData="getNextBookContent" ref="scroller">
      <div class="reader">
        <h3 class="reader-title">{{reader.name}}</h3>
        <div class="reader-content flow-text" v-html="reader.text"></div>
      </div>
    </Scroller>
  </Loading>
</template>
<script type="text/ecmascript-6">
  import Scroller from './Scroller'
  import loadingMixins from '../mixins/loading'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    mixins: [loadingMixins],
    computed: mapGetters(['reader']),
    components: {
      Scroller
    },
    methods: {
      ...mapActions(['getBookContent', 'getNextBookContent']),
      fetchData () {
        let vm = this
        return vm.getBookContent({
          id: vm.$route.params.bookId,
          index: vm.$route.params.chapterIndex
        })
      },
      getNextBookContent () {
        let vm = this
        let index = parseInt(vm.$route.params.chapterIndex, 10)
        let scroller = vm.$refs.scroller
        if (scroller.showRefreshPull) {
          if (vm.reader.first) {
            alert('已经是第一章了')
            return Promise.resolve(1)
          }
          index = index - 1
        } else if (scroller.showRefreshPush) {
          if (vm.reader.last) {
            alert('已经是最后一章了')
            return Promise.resolve(1)
          }
          index = index + 1
        }
        return vm.getBookContent({
          id: vm.$route.params.bookId,
          index
        }).then((res) => {
          vm.$router.push({name: 'bookChapter', params: {bookId: vm.$route.params.bookId, chapterIndex: index}})
          return Promise.resolve(res)
        }).catch((res) => {
          return Promise.reject(res)
        })
      }
    }
  }
</script>