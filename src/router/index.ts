import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router';

// 批量加载
const routesModules = import.meta.glob("./modules/*.ts",{import:'default',eager:true});  //eager 必须设置为true
const otherRoutes = [];
for(let key in (routesModules)){
    otherRoutes.push(...routesModules[key]);
    // let name = key.replace(/^\.\/modules\/(.*)\.\w+$/, '$1');
    // routesModules[key]().then(mod=>{
    //     otherRoutes.push(...mod);
    // })
}
const routes = [
    {
        path:"/",
        redirect:'/home'
    },
    ...otherRoutes
];

// console.log(Object.entries(routesModules))
const router = createRouter({
    history:createWebHistory(),
    routes,
    scrollBehavior:(to,from,savedPosition)=>{
        return {x:0,y:0}
    }
})

// 路由前置拦截器
router.beforeEach((to,from,next)=>{
    if(to.meta.title){
        document.title = to.meta.title;
    }
    next();
})

export default router;

