<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, reactive, toRaw, watch, toRefs } from 'vue';

export default {
  components: {},
  props: {},
  setup (props, { emit }) {
    const state = reactive({})
    return {
      ...toRefs(state),
    };
  },
};
</script>
