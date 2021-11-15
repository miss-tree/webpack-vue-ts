console.log("==========webpack-vue-ts=======");
console.log("==========引入的接口=======");
console.log("==========webpack-vue-ts=======");

import { reactive, createApp} from 'vue'
const proxy = reactive({
  msg: 'hello word'
})

console.log("vue  reactive", proxy);


import App from './pages/index.vue'

const app = createApp(App)

app.mount('#App')

