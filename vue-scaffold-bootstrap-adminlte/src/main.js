import { createApp } from 'vue'
import App from './App.vue'
import router from './common/router/index.js'
import store from './common/store/index.js'
import axios from 'axios'
import mixin from './common/mixin/index.js'
import VueCookies from 'vue-cookies'

// Examples https://adminlte.io/themes/v3
import 'admin-lte'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'admin-lte/dist/css/adminlte.min.css'


const app = createApp(App)
    .use(store)
    .use(router)
    .use(VueCookies)
    .mixin(mixin)


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
app.config.globalProperties.$axios = axios;

app.mount('#app')
