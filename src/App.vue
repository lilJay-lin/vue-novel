<template>
  <div id="app">
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
