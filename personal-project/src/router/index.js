import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: () => import("@/pages/DashboardPage.vue"),
    },
    {
      path: "/income",
      name: "Income",
      component: () => import("@/pages/IncomePage.vue"),
    },
    {
      path: "/calendar",
      name: "Calendar",
      component: () => import("@/pages/CalendarPage.vue"),
    },
    {
      path: "/404",
      name: "404View",
      component: () => import("@/pages/404Page.vue"),
    },
  ],
});

export default router;
