import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface"
import type { IResponse } from "@/domain/interfaces/Ipagination.interface"
import type {  CreateTeacherModel, FindTeacherModel, UpdateTeacherModel } from "../models/teacher.model"
import type { DeleteType } from "@/shared/enums/deletetype.enum"


export interface ITeacherRepository {
  create(payload: CreateTeacherModel): Promise<string> 
  update(data:UpdateTeacherModel): Promise<FindTeacherModel>
  delete(id: number, type: DeleteType): Promise<string>
  restore(id: number): Promise<string>
  // findone():Promise<string>
  findAll(query: IPaginationQuery): Promise<IResponse<FindTeacherModel>> 

}
