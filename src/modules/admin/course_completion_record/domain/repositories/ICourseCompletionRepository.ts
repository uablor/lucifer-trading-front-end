import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface"
import type { IResponse } from "@/domain/interfaces/Ipagination.interface"
import type { DeleteType } from "@/shared/enums/deletetype.enum"
import type { CreateCourseCompletionModel, FindCourseCompletionModel, UpdateCourseCompletionModel } from "../models/course_completion.model"


export interface ICourseCompletionRepository {
  create(payload: CreateCourseCompletionModel): Promise<string> 
  update(data:UpdateCourseCompletionModel): Promise<FindCourseCompletionModel>
  delete(id: number, type: DeleteType): Promise<string>
  restore(id: number): Promise<string>
  findAll(query: IPaginationQuery): Promise<IResponse<FindCourseCompletionModel>> 

}
