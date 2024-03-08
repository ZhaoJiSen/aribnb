import { createWebHistory, createRouter } from "vue-router";
// import Home from "@/layout/headerCommon/index.vue";
import Login from "@/views/Login/index.vue";

const router = createRouter({
  routes: [
    // {
    //   path: "/home",
    //   name: "Home",
    //   component: Home,
    // },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
  history: createWebHistory(),
});

export default router;
