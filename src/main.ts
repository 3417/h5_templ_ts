import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import request from './service';
import './assets/rem/rem'
import './assets/style/common.scss'
import {Popup,Loading} from 'vant';

const app = createApp(App);
app.provide('$http',request);
app.use(router).use(store).use(Popup).use(Loading).mount('#app')
