import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(Antd).use(pinia).mount('#app')
