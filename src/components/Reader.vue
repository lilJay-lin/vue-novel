<template>
  <Loading>
    <div class="reader">
      <h3 class="reader-title">{{reader.name}}</h3>
      <div class="reader-content flow-text" v-html="reader.text"></div>
    </div>
  </Loading>
</template>
<script type="text/ecmascript-6">
  import loadingMixins from '../mixins/loading'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    mixins: [loadingMixins],
    computed: mapGetters(['reader']),
    methods: {
      ...mapActions(['getBookContent']),
      fetchData () {
        let vm = this
        return vm.getBookContent({
          id: vm.$route.params.bookId,
          index: vm.$route.params.chapterIndex
        })
      }
    }
  }
</script>