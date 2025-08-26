// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const StudentEducationRoutes: RouteRecordRaw[] = [
    {
    path: 'student/profile',
    name: 'admin.student.profile',
    component: () => import('../views/StudentEducationView.vue'),
    meta: {
      guestOnly: true
    }
  },
]
