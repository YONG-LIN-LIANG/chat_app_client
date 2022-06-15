import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import CsRoom from "@/views/CsRoom.vue";
import ClientRoom from "@/views/ClientRoom.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/Login",
      name: "Login",
      component: Login,
    },
    {
      path: "/CsRoom",
      name: "CsRoom",
      component: CsRoom,
    },
    {
      path: "/ClientRoom",
      name: "ClientRoom",
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
