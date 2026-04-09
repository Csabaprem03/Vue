import { createRouter, createWebHashHistory } from "vue-router";
import "animate.css";
import { useAuthStore } from "../stores/authStore";
import { useGamesStore } from "../stores/gamesStore";

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
        // requiresGuest: true,
        enterClass: "animate__animated animate__fadeInRight",
        leaveClass: "animate__animated animate__fadeOutRight",
      },
    },
    {
      path: "/user",
      name: "account",
      component: () => import("../views/Account.vue"),
      meta: {
        // requiresAuth: true,
        enterClass: "animate__animated animate__fadeInRight",
        leaveClass: "animate__animated animate__fadeOutRight",
      },
      children: [
        {
          path: "publisher",
          name: "publisher",
          component: () => import("../components/pages/Publisher.vue"),
          meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutRight",
          },
        },
        {
          path: "games",
          name: "games.post",
          component: () => import("../components/pages/GamesPost.vue"),
          meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutRight",
          },
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
          meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutRight",
          },
        },
        {
          path: "collectibles/:id",
          name: "collectibles.edit",
          component: () => import("../components/pages/CollectiblePost.vue"),
          props: (route) => ({ id: Number(route.params.id) }),
          meta: {
            enterClass: "animate__animated animate__fadeInRight",
            leaveClass: "animate__animated animate__fadeOutRight",
          },
        },
      ],
    },
    {
      path: "/favorites",
      name: "favorite",
      component: () => import("../components/domains/FavoriteGames.vue"),
      meta: {
        enterClass: "animate__animated animate__zoomInDown",
        leaveClass: "animate__animated animate__zoomOutDown",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../components/pages/NotFound.vue"),
      meta: {
        enterClass: "animate__animated animate__zoomInDown",
        leaveClass: "animate__animated animate__zoomOutDown",
      },
    },
    {
      path: "/user/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
        requiresGuest: true,
        enterClass: "animate__animated animate__fadeInRight",
        leaveClass: "animate__animated animate__fadeOutRight",
      },
    },
    {
      path: "/games",
      name: "games.list",
      component: () => import("../views/Game.vue"),
      meta: {
        enterClass: "animate__animated animate__zoomInRight",
        leaveClass: "animate__animated animate__zoomOutRight",
      },
    },
    {
      path: "/collectibles",
      name: "gyujtheto",
      component: () => import("../views/Collectible.vue"),
      meta: {
        enterClass: "animate__animated animate__zoomInLeft",
        leaveClass: "animate__animated animate__zoomOutLeft",
      },
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
          meta: {
            enterClass: "animate__animated animate__zoomInUp",
            leaveClass: "animate__animated animate__zoomOutDown",
          },
        },
      ],
    },
    {
      path: "/collectibles/:id",
      name: "collectible.id",
      component: () => import("../components/domains/CollectibleDetails.vue"),
      props: (route) => ({ ...route.params, id: Number(route.params.id) }),
      beforeEnter(to, from) {
        const stores = useGamesStore();
        const exists = stores.collectibles.find(
          (f) => Number(f.id) === Number(to.params.id),
        );
        if (!exists)
          return {
            name: "NotFound",
            params: { pathMatch: to.path.split("/").splice(1) },
            query: to.query,
            hash: to.hash,
          };
      },
      meta: {
        enterClass: "animate__animated animate__zoomInUp",
        leaveClass: "animate__animated animate__zoomOutDown",
      },
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
