<template>
  <Loading>
    <ul class="collection">
      <li v-for="(book, index) in books" class="collection-item avatar book" :key="index">
        <div @click="showBookDetail(book.id)">
          <img :src="book.image" alt="" class="square">
          <p class="title">{{book.name}}</p>
          <p>{{book.latest}}</p>
          <p>{{book.description}}</p>
        </div>
      </li>
    </ul>
  </Loading>
</template>
<script type="text/ecmascript-6">
import loadingMixins from '../mixins/loading'
import {mapGetters, mapActions} from 'vuex'
export default {
  mixins: [loadingMixins],
  computed: mapGetters(['books']),
  methods: {
    ...mapActions(['deleteBook', 'getAllBooks', 'getBookDetail']),
    showBookDetail (index) {
      this.$router.push({name: 'bookDetail', params: {bookId: index}})
    },
    fetchData () {
      return this.getAllBooks()
    }
  }
}
</script>
