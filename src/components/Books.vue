<template>
  <div class="book-home">
    <div @click.capture="onSearchClick">
      <Search></Search>
    </div>
    <Loading>
      <template v-if="books">
        <ul class="collection">
          <li v-if="books.length === 0" class="collection-none">暂无数据</li>
          <li v-for="(book, index) in books" class="collection-item" :key="index" v-else>
            <div @click="showBookDetail(book.id)" class="book">
              <a href="javascript:void(0)" class="del" @click.stop="deleteBook(book.id, index)"></a>
              <img :src="book.image" alt="" class="book-logo"/>
              <div class="book-info">
                <p class="book-title">{{book.name}}</p>
                <p class="book-title">作者：{{book.author}}</p>
                <router-link :to="{name: 'bookDetail', params: {bookId: book.id}}" class="book-latest blue-text lighten-3-text">最新章节：{{book.latest}}</router-link>
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
  components: {
    Search
  },
  computed: mapGetters(['books']),
  methods: {
    ...mapActions(['deleteBook', 'getAllBooks', 'getBookDetail']),
    showBookDetail (index) {
      this.$router.push({name: 'bookDetail', params: {bookId: index}})
    },
    fetchData () {
      return this.getAllBooks()
    },
    onSearchClick () {
      this.$router.push({name: 'searchBook'})
    }
  }
}
</script>
