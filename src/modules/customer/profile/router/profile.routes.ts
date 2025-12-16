// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from "vue-router";

export const profileRoutes: RouteRecordRaw[] = [
  {
    path: "profile",
    name: "customer.profile",
    component: () => import("../views/profileView.vue"),
    meta: {
        skipAuthCheck: false,
    },
  },
];
