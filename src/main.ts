import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import requests from './request'

const app = createApp(App)
app.config.globalProperties.$axios = requests
app.use(createPinia())
app.use(router)

app.mount('#app')
