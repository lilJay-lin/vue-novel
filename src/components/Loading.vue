<template>
  <div class="loading-wrapper">
    <div class="loading" v-if="loading.status">
      数据加载中，请稍后...
    </div>
    <div v-if="loading.error" class="error">
      {{ loading.error }}
    </div>
    <slot v-if="loading.success"></slot>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  computed: mapGetters(['loading'])
}
</script>
