// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const CourseCategoriesRoutes: RouteRecordRaw[] = [
  {
    path: 'course_categorie',
    name: 'admin.course_categorie',
    component: () => import('../views/CourseCategoriesView.vue'),

  },
]
