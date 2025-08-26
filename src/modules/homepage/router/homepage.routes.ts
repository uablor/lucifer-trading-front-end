// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from "vue-router";

export const HomepageRoutes: RouteRecordRaw[] = [
  {
    path: "/Homepage",
    component: () => import("../components/layout/HomepageLayout.vue"),
    meta: {
      skipAuthCheck: true,
    },
    children: [
      {
        path: "",
        name: "homepage",
        component: () => import("../views/homepageView.vue"),
        meta: {
          skipAuthCheck: true,
        },
      },
    ],
  },
];
