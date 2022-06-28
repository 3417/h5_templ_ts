import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import request from './service';
import plugins from './plugins/index';
import './assets/style/common.scss'
import {Popup,Loading,Button,Icon} from 'vant';
const app = createApp(App);
app.provide('$http',request);
app.use(router).use(Popup).use(Loading).use(Button).use(Icon).use(plugins).use(createPinia()).mount('#app')
