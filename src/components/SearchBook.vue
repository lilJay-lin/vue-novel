<template>
  <div>
    <Search @search="onSearchBook"></Search>
    <Loading>
      <template v-if="books">
        <ul class="collection">
          <li v-for="(book, index) in books" class="collection-item" :key="index">
            <div @click="showBookDetail(book)" class="book">
              <img :src="book.image" alt="" class="book-logo"/>
              <div class="book-info">
                <p class="book-title">{{book.name}}</p>
                <p class="book-source">来源：{{book.host}}</p>
                <p class="book-latest">最新章节：{{book.latest}}</p>
                <div class="book-desc">{{book.description}}</div>
              </div>
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <p>没有图书记录</p>
      </template>
    </Loading>
  </div>
</template>
<script type="text/ecmascript-6">
  import Search from './Search'
  import loadingMixins from '../mixins/loading'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    mixins: [loadingMixins],
    data () {
      return {
        disabledLoading: true,
        keyword: ''
      }
    },
    components: {
      Search
    },
    computed: mapGetters({
      books: 'searchResult'
    }),
    methods: {
      ...mapActions(['searchBook', 'getBookDetailByName']),
      onSearchBook (value) {
        let vm = this
        vm.disabledLoading = false
        vm.keyword = value
        vm.startFetch()
      },
      fetchData () {
        let vm = this
        return vm.searchBook(vm.keyword)
      },
      showBookDetail (book) {
        this.getBookDetailByName(book).then(({id}) => {
          this.$router.push({name: 'bookDetail', params: {bookId: id}})
        })
      }
    }
  }
</script>