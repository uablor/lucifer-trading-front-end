import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface"
import type { IResponse } from "@/domain/interfaces/Ipagination.interface"
import type { DeleteType } from "@/shared/enums/deletetype.enum"
import type { CreateCourseModel, FindCourseModel, UpdateCourseModel } from "../models/course.model"


export interface ICourseRepository {
  create(payload: CreateCourseModel): Promise<string> 
  update(data:UpdateCourseModel): Promise<FindCourseModel>
  delete(id: number, type: DeleteType): Promise<string>
  restore(id: number): Promise<string>
  findAll(query: IPaginationQuery): Promise<IResponse<FindCourseModel>> 

}
