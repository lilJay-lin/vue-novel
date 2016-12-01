<template>
  <Loading>
    <Scroller>
      <div class="book-wrapper">
        <div class="book">
          <img :src="detail.image" alt="" class="book-logo"/>
          <div class="book-info">
            <p class="book-title">{{detail.name}}</p>
            <p class="book-source">来源：{{detail.host}}</p>
            <p class="book-latest">最新章节：{{detail.latest}}</p>
            <div class="book-desc">{{detail.description}}</div>
          </div>
        </div>
      </div>
      <ul class="collection">
        <template v-for="(chapter, index) in detail.chapters">
          <li class="collection-item" :key="index">
            <a href="javascript:void(0)" @click="showChapterContent(index + 1)">{{chapter.name}}</a>
          </li>
        </template>
      </ul>
    </Scroller>
  </Loading>
</template>
<script type="text/ecmascript-6">
  import Scroller from './Scroller'
  import loadingMixins from '../mixins/loading'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    mixins: [loadingMixins],
    computed: mapGetters(['detail']),
    components: {
      Scroller
    },
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
