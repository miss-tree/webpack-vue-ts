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
 </div>
</template>

<script>
import { ref, reactive, toRaw, watch, toRefs} from 'vue';
import './index.scss';

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
