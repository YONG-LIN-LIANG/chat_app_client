import { createRouter, createWebHistory } from "vue-router";
import CsLogin from "@/views/CsLogin.vue";
import CsRoom from "@/views/CsRoom.vue";
import ClientRoom from "@/views/ClientRoom.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: CsLogin,
    },
    {
      path: "/csRoom",
      name: "csRoom",
      component: CsRoom,
    },
    {
      path: "/clientRoom",
      name: "clientRoom",
      component: ClientRoom,
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
