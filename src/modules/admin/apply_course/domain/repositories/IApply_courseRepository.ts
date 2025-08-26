import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface"
import type { IResponse } from "@/domain/interfaces/Ipagination.interface"
import type { DeleteType } from "@/shared/enums/deletetype.enum"
import type { CreateApplyCourseModel, FindApplyCourseModel, UpdateApplyCourseModel } from "../models/apply_course.model"

export interface IApplyCourseRepository {
  create(payload: CreateApplyCourseModel): Promise<string> 
  update(data:UpdateApplyCourseModel): Promise<FindApplyCourseModel>
  delete(id: number, type: DeleteType): Promise<string>
  restore(id: number): Promise<string>
  findAll(query: IPaginationQuery): Promise<IResponse<FindApplyCourseModel>> 

}
