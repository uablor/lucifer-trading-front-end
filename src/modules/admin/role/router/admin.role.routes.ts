// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const RoleRoutes: RouteRecordRaw[] = [
  {
    path: 'role/admin',
    name: 'admin.role',
    component: () => import('../views/RoleView.vue'),

  },
]
