import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import request from './service';
import plugins from './plugins/index';
import vspop from './components/layer/index';
import directivePlugins from './utils/directive';
import './utils/weChatFontSize';
import './assets/style/common.scss'
const app = createApp(App);
app.config.globalProperties.$request = request;  //挂载到全局this上
app.use(router).use(plugins).use(vspop).use(directivePlugins).use(createPinia()).mount('#app')
