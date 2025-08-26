
import type { timestamp } from "@/domain/models/best.timestamp.entity";
import type { FindTeacherModel } from "@/modules/admin/teacher/domain/models/teacher.model";

export enum CourseStatus{
  OPEN = "open",
  CLOSED = "closed",

}
export interface CourseModel {
  id: number;
  teacher: number | null;                    
  category: number | null;                   
  title: string;                      
  price:  number | null;                     
  max_student: number | null;              
  start_date: string;                
  end_date: string;                  // วันที่สิ้นสุดการเรียน (เช่น "2025-09-15")
  registration_start_date: string;  // วันที่เริ่มลงทะเบียน
  registration_end_date: string;    // วันที่สิ้นสุดการลงทะเบียน
  description: string;               // คำอธิบายคอร์ส
  status: CourseStatus;        // สถานะคอร์ส ("open" หรือ "closed")
  duration_hours: number | null;            // ระยะเวลาการเรียน (ชั่วโมง)
}

export interface CreateCourseModel extends Omit<CourseModel, "id"> {


}

export interface FindCourseModel extends Omit<CourseModel, "teacher"|"category">, timestamp {
    teacher: FindTeacherModel,
    category: FindCourseModel,
}

export interface UpdateCourseModel extends CourseModel {
}
