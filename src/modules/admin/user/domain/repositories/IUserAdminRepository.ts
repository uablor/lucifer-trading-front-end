import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface"
import type { IResponse } from "@/domain/interfaces/Ipagination.interface"
import type { DeleteType } from "@/shared/enums/deletetype.enum"
import type { CreateUserAdminModel, FindUserAdminModel, UpdateUserAdminModel } from "../models/userAdmin.model"
import type { GetType } from "@/shared/enums/pagination.query.enum"


export interface IUserAdminRepository {
  create(payload: CreateUserAdminModel): Promise<string> 
  update(data:UpdateUserAdminModel): Promise<FindUserAdminModel>
  delete(id: number, type: DeleteType): Promise<string>
  restore(id: number): Promise<string>
  // findone():Promise<string>
  findAll(query: IPaginationQuery): Promise<IResponse<FindUserAdminModel>> 
  findRoleAll(type: GetType): Promise<[]> 

}
