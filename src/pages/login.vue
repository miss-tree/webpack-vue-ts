<template>
  <div class="login">
    <div>登录界面</div>
    <div class="login_btn">
      <button @click="setToken">登录</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRaw, watch, toRefs } from 'vue';
import router from "@/router"
// import './index.scss';

export default {
  components: {},
  props: {},
  setup (props, { emit }) {
    const state = reactive({
      token: {
        name: 'miss-tree',
        psw: '123456'
      }
    })

    const setToken = () => {
      localStorage.setItem('token', JSON.stringify(toRaw(state.token)))
      router.push('/home')
    }
    return {
      ...toRefs(state),
      setToken,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("~@/assets/css/index.scss");
</style>
