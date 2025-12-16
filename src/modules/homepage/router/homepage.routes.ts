// src/router/routes/auth.routes.ts
import { authRoutes } from "@/modules/auth/router/auth.routes";
import type { RouteRecordRaw } from "vue-router";

export const HomepageRoutes: RouteRecordRaw[] = [
  {
    path: "/homepage",
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
        children: [
          ...authRoutes
        ],
      },
    ],
  },
];
