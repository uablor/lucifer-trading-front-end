
import type { timestamp } from "@/domain/models/best.timestamp.entity";
import type { FindCourseModel } from "@/modules/admin/course/domain/models/course.model";
import type { FindStudentModel } from "@/modules/admin/student/domain/models/student.model";

export enum ApplyCourseStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface ApplyCourseModel {
  id: number;
  student: number | null;       
  course: number | null;      
  status: ApplyCourseStatus; 
  reason: number | null;       
}


export interface CreateApplyCourseModel extends Omit<ApplyCourseModel, "id"> {


}

export interface FindApplyCourseModel extends Omit<ApplyCourseModel, "student"|"course">, timestamp {
    student: FindStudentModel,
    course: FindCourseModel
}

export interface UpdateApplyCourseModel extends ApplyCourseModel {
}
