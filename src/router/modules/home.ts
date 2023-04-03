import Home from '@/views/Home.vue';
export default [
    {
        path:'/home',
        name:"home",
        meta:{
            title:"首页"
        },
        component:()=>import("@/views/Home.vue")
    },
    {
        path:'/about',
        name:"about",
        meta:{
            title:"关于我"
        },
        component:()=>import("@/views/About.vue")
    }
]