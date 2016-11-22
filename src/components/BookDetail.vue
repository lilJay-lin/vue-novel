<template>
  <div>
    <ul class="collection">
      <template v-for="(chapter, index) in detail.chapters">
        <li @click="getBookContent(index)" class="collection-item" :key="index">{{chapter.name}}</li>
      </template>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: mapGetters(['detail']),
    methods: {
      readerBook (chapter) {
      },
      ...mapActions(['getBookContent'])
    }
  }
</script>