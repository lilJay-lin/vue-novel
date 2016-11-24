<template>
  <Loading>
    <ul class="collection">
      <template v-for="(chapter, index) in detail.chapters">
        <li class="collection-item" :key="index">
          <a href="javascript:void(0)" @click="showChapterContent(index + 1)">{{chapter.name}}</a>
        </li>
      </template>
    </ul>
  </Loading>
</template>
<script type="text/ecmascript-6">
  import loadingMixins from '../mixins/loading'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    mixins: [loadingMixins],
    computed: mapGetters(['detail']),
    methods: {
      ...mapActions(['getBookDetail']),
      showChapterContent (chapter) {
        let vm = this
        vm.$router.push({name: 'bookChapter', params: {bookId: vm.$route.params.bookId, chapterIndex: chapter}})
      },
      fetchData () {
        let vm = this
        return vm.getBookDetail(vm.$route.params.bookId)
      }
    }
  }
</script>
