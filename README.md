# h5_templ_ts
基于Vue3.0+Vite+Ts的H5模板

### 关于Vue3.0挂载到原型的请求方法
```
<!-- main.ts -->
const app = createApp(App);
app.provide('$http',request);
<!-- some xxx.vue -->
const $http: any = inject("$http");
$http.执行

2. 通过proxy(this)方式去调用挂载到原型的属性或请求(建议使用第二种方法)
```

### .env文件配置
1. package.json重如果没有配置类似.env.dev这种别名的话(默认配置是:.env.development)
2. .env文件默认配置是VITE_APP_xxxx开头
3. package.json中使用 --mode方式去启动项目不同的文件配置

### 关于vant组件

1. 已经使用插件自动化引入，除开一些特别的插件需要手动引入
2. 特别的插件引入(具体如何使用请参考Vant的官方地址:https://vant-ui.github.io/vant/#/zh-CN/home)
```
 // Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';


```
### JS 中动态计算像素宽度
```
动态计算
let scale = window.screen.width / <根据当前设计稿的宽度>  //计算缩放比
((设置的像素单位 * scale) * 2).toFixed(2) + 'px';
```

### Vue3.0中的注意事项
1. vue3.0的项目去除了filters  需要自己结合methods方法和computed来实现
2. vue3.0可支持多个节点，不需要写在一个节点里面了
3. 其他请参考相关文档

### Vue3.4版本注意事项
1. Vue3.3x版本中的方法警告  将在此版本中移除请注意适配

## 注意 
1. vite4 需要node16(含)以上的版本
2. vite5 需要node20以上(含)的版本