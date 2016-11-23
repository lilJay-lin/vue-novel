<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <ul class="collection" v-if="success">
      <template v-for="(chapter, index) in detail.chapters">
        <li @click="getBookContent(index)" class="collection-item" :key="index">{{chapter.name}}</li>
      </template>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data () {
      return {
        loading: false,
        success: false,
        error: null
      }
    },
    computed: mapGetters(['detail']),
    methods: {
      ...mapActions(['getBookContent', 'getBookDetail']),
      readerBook (chapter) {
      },
      fetchData () {
        this.error = null
        this.sucess = false
        this.loading = true
        this.getBookDetail().then(() => {
          this.success = true
        }, ({message}) => {
          this.error = message
        }).then(() => {
          this.loadding = false
        })
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    }
  }
</script>
