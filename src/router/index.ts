import { createRouter, createWebHashHistory, } from "vue-router";
import 'animate.css';


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/', name: 'home', component: () => import('../components/Home.vue'), meta: {
                enterClass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft',
            }
        },
        {
            path: '/user/login', name: 'login', component: () => import('../views/Login.vue'), meta: {
                enterClass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft',
            }
        },
        {
            path: '/user/register', name: 'register', component: () => import('../views/Register.vue'), meta: {
                enterClass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft',
            }
        },
        { path: '/games', name: 'games.list', component: () => import('../views/GameView.vue') },
        {
            path: '/collectibles', name: 'gyujtheto', component: () => import('../views/CollectibleView.vue'), meta: {
                enterClass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft',
            }
        },
        {
            path: '/games/:slug', name: 'games.detail', component: () => import('../components/domains/GameDetails.vue'), props: true, children: [{
                path: 'collectibles/:type', name: 'game.collectibles.type', component: () => import('../components/domains/CollectibleTypeCard.vue'), props: true
            }]
        }
        // {path:'/collectibles/:id',name:'collectible.id',component:()=>import('../')

    ]

})

export default router