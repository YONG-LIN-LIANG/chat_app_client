import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./styles/app.css";
import "./assets/style/style.css";
const app = createApp(App);

app.use(createPinia());
app.use(router);

import { usecsRoomStore } from "@/stores/csRoom";
const csRoomStore = usecsRoomStore();
router.beforeEach((to, from, next) => {
  if(to.fullPath.includes("/csRoom")) {
    if(typeof(csRoomStore.cs?.member_id) === "number"){
        next()
    } else{
        next({ name:"login" })
    }
  }
//   console.log("to", to, "from", from);
  next();
});

app.mount("#app");
