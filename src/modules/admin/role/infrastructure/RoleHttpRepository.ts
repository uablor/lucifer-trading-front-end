import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { IRoleRepository } from "../domain/repositories/IRoleRepository";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type { DeleteType } from "@/shared/enums/deletetype.enum";
import type { CreateRoleModel, FindRoleModel, UpdateRoleModel } from "../domain/models/role.model";
import type { PermissionModel } from "../domain/models/permission.model";

@injectable()
export class RoleHttpRepository implements IRoleRepository {
  constructor(@inject(AxiosApi) private readonly _api: AxiosApi) {}

  async create(payload: CreateRoleModel): Promise<string> {
      const res = await this._api.axios.post("/role", payload);
      return res.data;
  }

  async update(data: UpdateRoleModel): Promise<FindRoleModel> {
    const { id, ...rest } = data;
    console.log(id, rest);
    const res = await this._api.axios.patch("/role/" + id, rest);
    return res.data;
  }


  async delete(id: number, type: DeleteType): Promise<string> {
    const res = await this._api.axios.delete(`/role/${type}/${id}`);
    return res.data;
  }
  async restore(id: number): Promise<string> {
    const res = await this._api.axios.patch(`/role/restore/${id}`);
    return res.data;
  }


//   async findone(): Promise<string> {
//     const res = await this._api.axios.post("/auth/refresh");
//     return res.data.token;
//   }

  async findAll(query: IPaginationQuery): Promise<IResponse<FindRoleModel>> {
    const res = await this._api.axios.get("/role", { params: query  });
    // console.log("asdfadsf",res.data);
    return res.data;
  }
  async findPermissionAll(): Promise<PermissionModel[]> {
    const res = await this._api.axios.get("/permission");
    return res.data;
  }
}
