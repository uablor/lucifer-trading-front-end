
import "reflect-metadata";

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { container } from "tsyringe"
import { AxiosApi } from "@/configurations/axios.config"
import router from './router'
import { createPinia } from 'pinia'
import i18n from "./configurations/vue18n.config";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import "@/assets/main.css"
container.registerSingleton(AxiosApi)

const app = createApp(App)
app.use(i18n)
app.use(Antd)
app.config.globalProperties.$container = container
app.config.globalProperties.$axios = container.resolve(AxiosApi)
app.use(router)
app.use(createPinia())
app.mount('#app')
