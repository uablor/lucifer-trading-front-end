// import type { address } from "@/domain/models/address.entity";
import type { timestamp } from "@/domain/models/best.timestamp.entity";

export interface TeacherModel {
  id: number;
  name: string;
  surname: string;
  specialization: string;
  experience: number | null;
  education: string;
}

export interface CreateTeacherModel extends Omit<TeacherModel, "id"> {
  password: string;
  email: string | null;
}

export interface FindTeacherModel extends TeacherModel, timestamp {
  email: string;
}

export interface UpdateTeacherModel extends TeacherModel {}
