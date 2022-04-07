import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import request from './service';
import './assets/rem/rem'
import './assets/style/common.scss'
import {Popup,Loading} from 'vant';
const app = createApp(App);
app.provide('$http',request);
app.use(router).use(Popup).use(Loading).use(createPinia()).mount('#app')
