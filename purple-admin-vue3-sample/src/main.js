import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/scss/style.scss'
import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/main.css'

import VueGridLayout from "vue3-grid-layout";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)

app.use(router)
    .use(VueApexCharts)
    .component('GridLayout', VueGridLayout.GridLayout)
    .component('GridItem', VueGridLayout.GridItem)
    .mount('#app')