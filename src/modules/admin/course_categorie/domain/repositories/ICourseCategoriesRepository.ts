import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface"
import type { IResponse } from "@/domain/interfaces/Ipagination.interface"
import type {  CreateCourseCategoriesModel, FindCourseCategoriesModel, UpdateCourseCategoriesModel } from "../models/course_categories.model"
import type { DeleteType } from "@/shared/enums/deletetype.enum"


export interface ICourseCategoriesRepository {
  create(payload: CreateCourseCategoriesModel): Promise<string> 
  update(data:UpdateCourseCategoriesModel): Promise<FindCourseCategoriesModel>
  delete(id: number, type: DeleteType): Promise<string>
  restore(id: number): Promise<string>
  // findone():Promise<string>
  findAll(query: IPaginationQuery): Promise<IResponse<FindCourseCategoriesModel>> 

}
