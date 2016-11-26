<template>
  <div id="app">
    <router-link :to="{name: 'searchBook'}" class="btn">搜索图书</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Books from './components/Books'
import BookDetail from './components/BookDetail'
import Reader from './components/Reader'
export default {
  name: 'app',
  components: {
    Books,
    BookDetail,
    Reader
  }
}
</script>

