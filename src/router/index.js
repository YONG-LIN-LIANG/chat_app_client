import { createRouter, createWebHistory } from "vue-router";
import CsLogin from "@/views/CsLogin.vue";
import CsRoom from "@/views/CsRoom.vue";
import ClientRoom from "@/views/ClientRoom.vue";
import Msg from "@/components/csRoom/Msg.vue";
import Ranking from "@/components/csRoom/Ranking.vue";
import Score from "@/components/csRoom/Score.vue";

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
      children: [
        {
          path: "msg",
          component: Msg,
        },
        {
          path: "ranking",
          component: Ranking,
        },
        {
          path: "score",
          component: Score,
        },
      ],
    },
    {
      path: "/clientRoom",
      name: "clientRoom",
      component: ClientRoom,
    },
  ],
});

export default router;
