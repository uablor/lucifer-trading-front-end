// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const ApplyCourseRoutes: RouteRecordRaw[] = [
  {
    path: 'apply_course',
    name: 'admin.apply_course',
    component: () => import('../views/ApplyCourseView.vue'),

  },
]
