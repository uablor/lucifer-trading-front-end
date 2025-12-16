// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import { authRoutes } from "@/modules/auth/router/auth.routes";
import { adminRoutes } from "./routes/admin.routes";
import { authGuard } from "./guards/auth.guard";
import { HomepageRoutes } from "@/modules/homepage/router/homepage.routes";
import { customerRoutes } from "./routes/customer.routes";
const routes = [
  // ...authRoutes,
  ...adminRoutes,
  ...customerRoutes,
  ...HomepageRoutes,
  {
    path: "/",
    redirect: "/homepage",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

authGuard(router);

export default router;
