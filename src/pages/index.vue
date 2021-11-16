<template>
  <div>
    <div>
      <pre>
    file-loader, image-webpack-loader 图片文件加载
    style-loader, css-loader, sass-loader, sass, fibers CSS加载(此处使用sass预处理)
    vue-loader, @vue/compiler-sfc Vue加载
    postcss-loader, autoprefixer, cssnano postcss加载
     </pre>
    </div>
    <button @click="linkTo">跳转</button>
  </div>
</template>

<script>
import { ref, reactive, toRaw, watch, toRefs } from 'vue';
import router from '@/router'

export default {
  components: {},
  props: {},
  setup (props, { emit }) {
    const state = reactive({})
    const linkTo = () => {
      console.log("process.env", NODE_ENV, window.app);
      router.push('/webpack')
    }
    return {
      ...toRefs(state),
      linkTo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("~@/assets/css/index.scss");
</style>
