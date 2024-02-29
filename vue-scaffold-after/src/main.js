import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import { componentRegist } from '@/common/global-components.js'
import VueCookies from "vue-cookies";

import { i18n } from '@/common/i18n/i18n.js'
import { router } from '@/common/router/index.js'
import { commonMixin } from '@/common/mixin/index.js'
import { createAxios } from '@/common/axios-instance.js'
import store from '@/common/store/index.js'
import _ from 'lodash'
import { Util } from '@/common/util.js'
import App from './App.vue'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/theme/lux-bootstrap.min.css' // from https://bootswatch.com/
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import '@fortawesome/fontawesome-free/css/all.css'

const vueCookiesOption = {
    sameSite: 'Lax',
    path: '',
    domain: '',
    secure: ''
}

const app = createApp(App)
    .use(BootstrapVue3)
    .use(router)
    .use(store)
    .use(i18n)
    .use(Toast)
    .use(VueCookies, vueCookiesOption)
    .mixin(commonMixin)

componentRegist(app)

//app.config.globalProperties._ = _
//app.config.globalProperties.$ = $
//app.config.globalProperties.$axios = createAxios(process.env.NODE_ENV, store)
global._ = _
global.$ = $
global.$util = Util
global.$axios = createAxios(process.env.NODE_ENV, store)

app.mount('#app')
