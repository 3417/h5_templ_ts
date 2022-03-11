import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import request from './service';
import './assets/rem/rem'
const app = createApp(App);
app.provide('$http',request);
app.use(router).use(store).mount('#app')
