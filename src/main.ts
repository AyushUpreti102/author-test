import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from '@/api'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(VueAxios, axios)
app.use(createPinia())
app.use(router)

app.provide('axios', app.config.globalProperties.axios)

app.mount('#app')
