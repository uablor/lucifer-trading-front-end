import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { IUserAdminRepository } from "../domain/repositories/IUserAdminRepository";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type { DeleteType } from "@/shared/enums/deletetype.enum";
import type { CreateUserAdminModel, FindUserAdminModel, UpdateUserAdminModel } from "../domain/models/userAdmin.model";
import type { GetType } from "@/shared/enums/pagination.query.enum";

@injectable()
export class UserAdminHttpRepository implements IUserAdminRepository {
  constructor(@inject(AxiosApi) private readonly _api: AxiosApi) {}

  async create(payload: CreateUserAdminModel): Promise<string> {
      const res = await this._api.axios.post("/user", payload);
      return res.data;
  }

  async update(data: UpdateUserAdminModel): Promise<FindUserAdminModel> {
    const { id, ...rest } = data;
    console.log(id, rest);
    const res = await this._api.axios.patch("/user/" + id, rest);
    return res.data;
  }


  async delete(id: number, type: DeleteType): Promise<string> {
    const res = await this._api.axios.delete(`/user/${type}/${id}`);
    return res.data;
  }
  async restore(id: number): Promise<string> {
    const res = await this._api.axios.patch(`/user/restore/${id}`);
    return res.data;
  }


//   async findone(): Promise<string> {
//     const res = await this._api.axios.post("/auth/refresh");
//     return res.data.token;
//   }

  async findAll(query: IPaginationQuery): Promise<IResponse<FindUserAdminModel>> {
    const res = await this._api.axios.get("/user", { params: query  });
    // console.log("asdfadsf",res.data);
    return res.data;
  }

  async findRoleAll(type : GetType): Promise<[]> {
    const res = await this._api.axios.get("/role/" , { params: {type} });
    return res.data;
  }

//   async findAllDistrict(id: number): Promise<[]> {
//     console.log("asdfadsf",id);
//     const res = await this._api.axios.get("/district/" ,{ params: {id } });
//     console.log("asdfadsf",res.data);
//     return res.data;
//   }
}
