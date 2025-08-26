// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from "vue-router";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "auth.login",
    component: () => import("@modules/auth/views/LoginView.vue"),
    meta: {
      skipAuthCheck: true,
    },
  },
  {
    path: "/register",
    name: "auth.register",
    component: () => import("@modules/auth/views/RegisterView.vue"),
    meta: {
      skipAuthCheck: true,
    },
  },
  {
    path: "/logout",
    name: "auth.logout",
    // redirect: () => {
    //   const { useAuthStore } = useAuthStoreDynamic()
    //   useAuthStore().logout()
    //   return '/login'
    // }
    component: () => import("@modules/auth/views/LogoutView.vue"),
    meta: {
      skipAuthCheck: true,
    },
  },
  {
    path: "/verify-email",
    name: "auth.verify-email",
    component: () => import("@/modules/auth/views/email/TestView.vue"),
    meta: {
      skipAuthCheck: true,
    },
  },
  {
    path: "/verification-email",
    name: "auth.verification-email",
    component: () => import("@/modules/auth/views/email/EmailVerificationPage.vue"),
    meta: {
      skipAuthCheck: true,
    },
  },
  {
    path: "/token-expired",
    name: "auth.token-expired",
    component: () => import("@/modules/auth/views/token-wrranig/Token-expired.vue"),
    meta: {
      skipAuthCheck: true,
    },
  },
];
