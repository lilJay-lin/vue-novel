<template>
  <div class="search-box-wrapper">
    <div class="search-box white">
      <input type="text" @keypress.enter="onSearchHandle" class="search-input" placeholder="输入图书名称" maxlength="10" ref="search"/>
      <a href="javascript:void(0)" class="search-btn" @click="onSearchHandle">
        <i class="small material-icons">search</i>
      </a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    methods: {
      onSearchHandle () {
        let vm = this
        let value = vm.$refs.search.value
        if (!value) {
          alert('搜索图书名称不能为空')
          return
        }
        this.$emit('search', value.trim())
      }
    }
  }
</script>