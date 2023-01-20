import 'reflect-metadata'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import regisContainer from './di/registration'
import router from './router'

regisContainer()

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
