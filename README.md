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
```

### .env文件配置
1. package.json重如果没有配置类似.env.dev这种别名的话(默认配置是:.env.development)
2. .env文件默认配置是VUE_APP_xxxx开头
### 关于vw换算问题
1. 设计稿为375  换算为  1vw = 3.75px;
2. 设计稿为750 换算为 1vw = 7.5px;

```
动态计算
let scale = window.screen.width / 750  //计算缩放比
((设置的像素单位 * scale) * 2).toFixed(2) + 'px';
```
