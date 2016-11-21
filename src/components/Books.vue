<template>
  <div>
    books
    <button @click="getAllBooks()">获取图书列表</button>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: mapGetters(['books']),
  methods: mapActions(['deleteBook', 'getAllBooks'])
}
</script>