<template>
  <div>
    <p class="flow-text">
      {{reader.text}}
    </p>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    computed: mapGetters(['reader'])
  }
</script>