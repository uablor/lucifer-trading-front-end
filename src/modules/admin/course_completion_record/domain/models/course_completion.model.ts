// import type { address } from "@/domain/models/address.entity";
import type { timestamp } from "@/domain/models/best.timestamp.entity";
import type { FindApplyCourseModel } from "@/modules/admin/apply_course/domain/models/apply_course.model";
// import type { FindTeacherModel } from "@/modules/admin/teacher/domain/models/teacher.model";
import type { FindUserAdminModel } from "@/modules/admin/user/domain/models/userAdmin.model";

export enum CourseCompletionStatus {
  PASSED = "passed",
  FAILED = "failed",
  WITHDRAWN = "withdrawn",
  INCOMPLETED = "incompleted",
}
export interface CourseCompletionModel {
  id: number;
  apply_courses: number | null;
  total_score: number | null;
  price?: number | null;
  is_certified: boolean;
  status: CourseCompletionStatus;
  completion_date: string;
  certificate_issued_date: string;
  total_study_hours: number | null;
}

export interface CreateCourseCompletionModel extends Omit<CourseCompletionModel, "id"|'price'> {


}

export interface FindCourseCompletionModel extends Omit<CourseCompletionModel, "apply_courses">, timestamp {
apply_course: FindApplyCourseModel,
created_by:FindUserAdminModel,
}

export interface UpdateCourseCompletionModel extends CourseCompletionModel {
}
