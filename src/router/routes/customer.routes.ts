// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from "vue-router";
import { profileRoutes } from "@/modules/customer/profile/router/profile.routes";

export const customerRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@modules/customer/layout/AppLayout.vue"),
    children: [
      ...profileRoutes,
      
      {
        path: ":pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@shared/views/NotFound.vue"),
      },
    ],
    meta: {
    },
  },
];
