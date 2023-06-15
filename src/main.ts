import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import request from './service';
import plugins from './plugins/index';
import vshow3 from './components/layer/index';
import directivePlugins from './utils/directive';
import './assets/style/common.scss';
import './utils/wx';
const app = createApp(App);
app.config.globalProperties.$request = request;  //挂载到全局this上
app.use(router).use(plugins).use(vshow3).use(directivePlugins).use(createPinia()).mount('#app')
