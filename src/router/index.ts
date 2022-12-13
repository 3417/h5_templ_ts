import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            redirect:"/home"
        },
        {
            path:'/home',
            component:Home,
            meta:{
                title:"首页"
            }
        },
        {
            path:'/About',
            name:'about',
            component:()=>import('@/views/About.vue'),
            meta:{
                title:"关于"
            },
        }
    ]
})
// 路由拦截器
router.beforeEach((to,from,next)=>{
    if(typeof to.meta.title === 'string'){
        document.title = to.meta.title;
    }
    next()
})
export default router;

