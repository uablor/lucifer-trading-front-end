import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type {  FindUserAdminModel } from "../../domain/models/userAdmin.model";
import type {  IUserAdminRepository } from "../../domain/repositories/IUserAdminRepository";
import {  UserAdminHttpRepository } from "../../infrastructure/UserAdminHttpRepository";

@injectable()
export class UseradminFindAllUseCase {
   constructor(
    @inject(UserAdminHttpRepository) protected _teacherHttpRepository: IUserAdminRepository
  ) {}

  async execute(query: IPaginationQuery): Promise<IResponse<FindUserAdminModel>> {
    const res = await this._teacherHttpRepository.findAll(query);

    return res;
  }
}
