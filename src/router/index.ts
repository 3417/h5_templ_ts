import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            component:Home,
            meta:{
                title:"首页"
            }
        },
        // {
        //     path:'/xxx',
        //     name:'xxxx',
        //     component:()=>import('../xxxxxx'),
        //     meta:{
        //         title:"xxxx"
        //     },
        // }
    ]
})

// FIXME:路由拦截器


export default router;

