import { createRouter, createWebHashHistory, } from "vue-router";
import 'animate.css';
import { useAuthStore } from "../stores/authStore";


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
                requiresGuest: true,
                enterClass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft',
            }
        },
        {
            path: '/user/register', name: 'register', component: () => import('../views/Register.vue'), meta: {
                requiresGuest: true,
                enterClass: 'animate__animated animate__fadeInRight',
                leaveClass: 'animate__animated animate__fadeOutLeft',
            }
        },
        { path: '/games', name: 'games.list', component: () => import('../views/Game.vue') },
        {
            path: '/collectibles', name: 'gyujtheto', component: () => import('../views/Collectible.vue')
        },
        {
            path: '/games/:slug', name: 'games.detail', component: () => import('../components/domains/GameDetails.vue'), props: true, children: [{
                path: 'collectibles/:type', name: 'game.collectibles.type', component: () => import('../components/domains/CollectibleTypeCard.vue'), props: true
            }]
        },
        { path: '/collectibles/:id', name: 'collectible.id', component: () => import('../components/domains/CollectibleDetails.vue'), props: route => ({ ...route.params, id: Number(route.params.id) }) }

    ]

})
// router.beforeEach((to, from, next) => {
//     const authStore = useAuthStore();
//     const isAuthenticated = !!authStore.token;

//     if (to.meta.requiresAuth && !isAuthenticated) {
//         next({ name: 'login' });
//     }
//     else if (to.meta.requiresGuest && isAuthenticated) {
//         next({ name: 'home' });
//     }
//     else {
//         next();
//     }
// });

export default router