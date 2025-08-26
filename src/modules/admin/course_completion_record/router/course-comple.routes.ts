// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const CourseCompletionRoutes: RouteRecordRaw[] = [
  {
    path: 'Course_completion_record',
    name: 'admin.course_completion_record',
    component: () => import('../views/Course-CompleView.vue'),

  },
]
