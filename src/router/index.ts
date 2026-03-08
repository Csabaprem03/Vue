import { createRouter, createWebHashHistory, } from "vue-router";



const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path:'/' , name:'home',component:()=>import('../components/Home.vue'),meta:{
            enterClass: 'animate__animated animate__fadeInRight',
            leaveClass: 'animate__animated animate__fadeOutLeft',
        }},
        {path:'/login' , name:'login',component:()=>import('../components/pages/Login.vue'),meta:{
            enterClass: 'animate__animated animate__fadeInRight',
            leaveClass: 'animate__animated animate__fadeOutLeft',
        }},
        {path:'/register' , name:'register',component:()=>import('../components/pages/Register.vue'),meta:{
            enterClass: 'animate__animated animate__fadeInRight',
            leaveClass: 'animate__animated animate__fadeOutLeft',
        }},
        {path:'/termek' , name:'termek',component:()=>import('../components/pages/Product.vue'),meta:{
            enterClass: 'animate__animated animate__fadeInRight',
            leaveClass: 'animate__animated animate__fadeOutLeft',
        }},
        {path:'/lista' , name:'lista',component:()=>import('../components/pages/List.vue')},
        {path:'/gyujtheto' , name:'gyujtheto',component:()=>import('../components/pages/Collectible.vue'),meta:{
            enterClass: 'animate__animated animate__fadeInRight',
            leaveClass: 'animate__animated animate__fadeOutLeft',
        }},
    ]

})

export default router