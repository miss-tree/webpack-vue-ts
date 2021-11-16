// import router from '@/router'
import App from './App.vue'


console.log("==========webpack-vue-ts=======");
console.log("==========引入的接口=======");
console.log("==========webpack-vue-ts=======");

import { reactive, createApp } from 'vue'
const proxy = reactive({
  msg: 'hello word'
})
console.log("vue  reactive", proxy);


const app = createApp(App)

window.app = app

app.use(router)
app.mount('#App')

