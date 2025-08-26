// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const UserAdminRoutes: RouteRecordRaw[] = [
  {
    path: 'user/admin',
    name: 'admin.user',
    component: () => import('../views/UserAdminView.vue'),

  },
]
