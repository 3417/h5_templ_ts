import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import request from './service';
import plugins from './plugins/index';
import pluginVant from './plugins/vant';
import './assets/style/common.scss'
const app = createApp(App);
app.provide('$http',request);
app.use(router).use(plugins).use(pluginVant).use(createPinia()).mount('#app')
