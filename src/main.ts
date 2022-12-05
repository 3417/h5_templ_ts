import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import request from './service';
import plugins from './plugins/index';
import pluginVant from './plugins/vant';
import vshow3 from './components/layer/index';
import './assets/style/common.scss'
const app = createApp(App);
app.provide('$http',request);
app.use(router).use(plugins).use(pluginVant).use(vshow3).use(createPinia()).mount('#app')
