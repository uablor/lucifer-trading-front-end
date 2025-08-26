// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const CourseRoutes: RouteRecordRaw[] = [
  {
    path: 'Course',
    name: 'admin.course',
    component: () => import('../views/CourseView.vue'),

  },
]
