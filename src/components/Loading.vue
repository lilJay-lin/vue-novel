<template>
  <div>
    <div class="loading" v-if="loading.status">
      Loading...
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
