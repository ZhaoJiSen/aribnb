import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => {
        import("../layout/headerCommon/index.vue");
      },
    },
  ],
  history: createWebHistory(),
});

export default router;
