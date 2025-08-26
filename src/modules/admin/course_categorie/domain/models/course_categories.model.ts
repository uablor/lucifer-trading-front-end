
import type { timestamp } from "@/domain/models/best.timestamp.entity";

export interface CourseCategoriesModel {
  id: number;
  name: string;
}

export interface CreateCourseCategoriesModel extends Omit<CourseCategoriesModel, "id"> {
}

export interface FindCourseCategoriesModel extends CourseCategoriesModel, timestamp {
}

export interface UpdateCourseCategoriesModel extends CourseCategoriesModel {}
