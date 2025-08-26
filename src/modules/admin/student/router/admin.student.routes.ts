// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: 'student',
    name: 'admin.student',
    component: () => import('../views/StudentView.vue'),
    meta: {
      guestOnly: true
    }
  },
]
