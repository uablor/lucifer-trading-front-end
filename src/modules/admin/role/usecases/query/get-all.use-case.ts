import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import { RoleHttpRepository } from "../../infrastructure/RoleHttpRepository";
import type { IRoleRepository } from "../../domain/repositories/IRoleRepository";
import type { FindRoleModel } from "../../domain/models/role.model";

@injectable()
export class RoleFindAllUseCase {
  constructor(
    @inject(RoleHttpRepository)
    protected _teacherHttpRepository: IRoleRepository
  ) {}

  async execute(query: IPaginationQuery): Promise<IResponse<FindRoleModel>> {
    const res = await this._teacherHttpRepository.findAll(query);

    return res;
  }
}
