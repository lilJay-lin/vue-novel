<template>
  <Loading>
    <div>
      <h3 class="left-align">{{reader.name}}</h3>
      <p class="flow-text">
        {{reader.text}}
      </p>
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