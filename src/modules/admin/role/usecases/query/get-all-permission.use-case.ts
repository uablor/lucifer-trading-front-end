import { inject, injectable } from "tsyringe";
// import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
// import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import { RoleHttpRepository } from "../../infrastructure/RoleHttpRepository";
import type { IRoleRepository } from "../../domain/repositories/IRoleRepository";
// import type { FindRoleModel } from "../../domain/models/role.model";
import type { PermissionModel } from "../../domain/models/permission.model";

@injectable()
export class PermissionFindAllUseCase {
  constructor(
    @inject(RoleHttpRepository)
    protected _HttpRepository: IRoleRepository
  ) {}

  async execute(): Promise<PermissionModel[]> {
    const res = await this._HttpRepository.findPermissionAll();
    return res;
  }
}
