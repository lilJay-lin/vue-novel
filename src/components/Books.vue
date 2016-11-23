<template>
  <div>
    <button @click="getAllBooks()" class="btn waves-light">获取图书列表</button>
    <ul class="collection">
      <li v-for="(book, index) in books" class="collection-item avatar book" :key="name">
        <div @click="showBookDetail(index)">
          <img :src="book.image" alt="" class="square">
          <p class="title">{{book.name}}</p>
          <p>{{book.latest}}</p>
          <p>{{book.description}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: mapGetters(['books']),
  methods: {
    ...mapActions(['deleteBook', 'getAllBooks', 'getBookDetail']),
    showBookDetail (index) {
      this.$router.push({name: 'bookDetail', params: {bookIndex: index}})
    }
  }
}
</script>
