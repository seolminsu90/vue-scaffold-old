import { createApp } from 'vue'
import App from './App.vue'
import router from './common/router/index.js'
import store from './common/store/index.js'
import axios from 'axios'
import mixin from './common/mixin/index.js'
import VueCookies from 'vue-cookies'

const app = createApp(App)
                .use(store)
                .use(router)
                .use(VueCookies)
                .mixin(mixin)

// global.$axios = axios // this. 도 안해도 되는 프로토타입 으로 등록됨
app.config.globalProperties.$axios = axios; 

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'


app.mount('#app')
