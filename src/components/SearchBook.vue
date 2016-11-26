<template>
  <div>
    <div class="row">
      <form class="col s12">
        <input id="icon_prefix" type="text" class="validate" ref="search">
        <a href="javascript:void(0)" @click="onSearchBook" class="btn">搜索</a>
      </form>
    </div>
    <Loading>
      <ul class="collection">
        <li v-for="(book, index) in books" class="collection-item avatar book" :key="index">
          <div @click="showBookDetail(book)">
            <img :src="book.image" alt="" class="square">
            <p class="title">{{book.name}}</p>
            <p>{{book.latest}}</p>
            <p>{{book.description}}</p>
          </div>
        </li>
      </ul>
    </Loading>
  </div>
</template>
<script type="text/ecmascript-6">
  import loadingMixins from '../mixins/loading'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    mixins: [loadingMixins],
    data () {
      return {
        disabledLoading: true
      }
    },
    computed: mapGetters({
      books: 'searchResult'
    }),
    methods: {
      ...mapActions(['searchBook', 'getBookDetailByName']),
      onSearchBook () {
        let vm = this
        vm.disabledLoading = false
        let value = vm.$refs.search.value
        if (!value) {
          alert('请先输入搜索图书名')
          return
        }
        vm.startFetch()
      },
      fetchData () {
        let vm = this
        let value = vm.$refs.search.value.trim()
        return this.searchBook(value)
      },
      showBookDetail (book) {
        this.getBookDetailByName(book).then(({id}) => {
          this.$router.push({name: 'bookDetail', params: {bookId: id}})
        })
      }
    }
  }
</script>