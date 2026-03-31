import { createRouter, createWebHashHistory } from "vue-router";
import "animate.css";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/games",
    },
    {
      path: "/user/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
        requiresGuest: true,
        enterClass: "animate__animated animate__fadeInRight",
        leaveClass: "animate__animated animate__fadeOutLeft",
      },
    },
    {
      path: "/user",
      name: "account",
      component: () => import("../views/Account.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "publisher",
          name: "publisher",
          component: () => import("../components/pages/Publisher.vue"),
        },
        {
          path: "games",
          name: "games.post",
          component: () => import("../components/pages/GamesPost.vue"),
        },
        {
          path: "games/:id",
          name: "games.edit",
          component: () => import("../components/pages/GamesPost.vue"),
          props: (route) => ({ id: Number(route.params.id) }),
        },
        {
          path: "collectibles",
          name: "collectibles.post",
          component: () => import("../components/pages/CollectiblePost.vue"),
        },
        {
          path: "collectibles/:id",
          name: "collectibles.edit",
          component: () => import("../components/pages/CollectiblePost.vue"),
          props: (route) => ({ id: Number(route.params.id) }),
        },
      ],
    },
    {
      path: "/favorites",
      name: "favorite",
      component: () => import("../components/domains/FavoriteGames.vue"),
      meta: {
        enterClass: "animate__animated animate__fadeInRight",
        leaveClass: "animate__animated animate__fadeOutLeft",
      },
    },
    {
      path: "/user/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
        requiresGuest: true,
        enterClass: "animate__animated animate__fadeInRight",
        leaveClass: "animate__animated animate__fadeOutLeft",
      },
    },
    {
      path: "/games",
      name: "games.list",
      component: () => import("../views/Game.vue"),
    },
    {
      path: "/collectibles",
      name: "gyujtheto",
      component: () => import("../views/Collectible.vue"),
    },
    {
      path: "/games/:slug",
      name: "games.detail",
      component: () => import("../components/domains/GameDetails.vue"),
      props: true,
      children: [
        {
          path: "collectibles/:type",
          name: "game.collectibles.type",
          component: () =>
            import("../components/domains/CollectibleTypeCard.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/collectibles/:id",
      name: "collectible.id",
      component: () => import("../components/domains/CollectibleDetails.vue"),
      props: (route) => ({ ...route.params, id: Number(route.params.id) }),
    },
  ],
});
router.beforeEach((to) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: "login" };
  } else if (to.meta.requiresGuest && isAuthenticated) {
    return { name: "game.list" };
  } else {
    return;
  }
});

export default router;
