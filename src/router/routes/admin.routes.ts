// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from "vue-router";
import { studentRoutes } from "@/modules/admin/student/router/admin.student.routes";
import { TeacherRoutes } from "@/modules/admin/teacher/router/admin.teacher.routes";
import { UserAdminRoutes } from "@/modules/admin/user/router/admin.teacher.routes";
import { RoleRoutes } from "@/modules/admin/role/router/admin.role.routes";
import { CourseCategoriesRoutes } from "@/modules/admin/course_categorie/router/admin.course.categories.routes";

import { StudentEducationRoutes } from "@/modules/admin/student_education/router/admin.teacher.routes";
import { CourseRoutes } from "@/modules/admin/course/router/course.routes";
import { ApplyCourseRoutes } from "@/modules/admin/apply_course/router/apply.course.routes";
import { CourseCompletionRoutes } from "@/modules/admin/course_completion_record/router/course-comple.routes";
export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    name: "",
    component: () => import("@modules/admin/components/layout/AppLayout.vue"),
    children: [
      ...studentRoutes,
      ...TeacherRoutes,
      ...UserAdminRoutes,
      ...RoleRoutes,
      ...CourseCategoriesRoutes,
      ...CourseRoutes,
      ...StudentEducationRoutes,
      ...ApplyCourseRoutes,
      ...CourseCompletionRoutes,
      

      {
        path: ":pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@shared/views/NotFound.vue"),
      },
    ],
    meta: {
    },
  },
];
