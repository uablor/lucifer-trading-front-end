import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface"
import type { IResponse } from "@/domain/interfaces/Ipagination.interface"
import type { DeleteType } from "@/shared/enums/deletetype.enum"
import type { CreateStudentEducationModel, FindStudentEducationModel, UpdateStudentEducationModel } from "../models/education.model"


export interface IStudentEducationRepository {
  create(payload: CreateStudentEducationModel): Promise<string> 
  update(data:UpdateStudentEducationModel): Promise<FindStudentEducationModel>
  delete(id: number, type: DeleteType): Promise<string>
  restore(id: number): Promise<string>
  // findone():Promise<FindStudentEducationModel>
  findAll(query: IPaginationQuery): Promise<IResponse<FindStudentEducationModel>> 

}
