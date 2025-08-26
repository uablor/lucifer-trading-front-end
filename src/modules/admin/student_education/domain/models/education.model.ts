// import type { address } from "@/domain/models/address.entity";
import type { timestamp } from "@/domain/models/best.timestamp.entity";

export  enum educationStatus{
  studying = "studying",
  graduated = "graduated",
}

interface StudentEducationModel {
  id: number;
  level: string; // e.g. email or education level
  field_of_study: string;
  current_occupation: string;
  work_experience: number;
  student_id: number;
  status: educationStatus;
}

export interface CreateStudentEducationModel extends Omit<StudentEducationModel, "id"> {
}

export interface FindStudentEducationModel extends StudentEducationModel, timestamp {
  email: string;
}

export interface UpdateStudentEducationModel extends StudentEducationModel {}
