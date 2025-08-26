// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const TeacherRoutes: RouteRecordRaw[] = [
  {
    path: 'teacher',
    name: 'admin.teacher',
    component: () => import('../views/TeacherView.vue'),

  },
]
