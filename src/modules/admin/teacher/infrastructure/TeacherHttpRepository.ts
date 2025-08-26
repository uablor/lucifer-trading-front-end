import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { ITeacherRepository } from "../domain/repositories/ITeacherRepository";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type {  CreateTeacherModel, FindTeacherModel, UpdateTeacherModel } from "../domain/models/teacher.model"
import type { DeleteType } from "@/shared/enums/deletetype.enum";

@injectable()
export class TeacherHttpRepository implements ITeacherRepository {
  constructor(@inject(AxiosApi) private readonly _api: AxiosApi) {}

  async create(payload: CreateTeacherModel): Promise<string> {
      const res = await this._api.axios.post("/teacher", payload);
      return res.data;
  }

  async update(data: UpdateTeacherModel): Promise<FindTeacherModel> {
    const { id, ...rest } = data;
    console.log(id, rest);
    const res = await this._api.axios.patch("/teacher/" + id, rest);
    return res.data;
  }


  async delete(id: number, type: DeleteType): Promise<string> {
    const res = await this._api.axios.delete(`/teacher/${type}/${id}`);
    return res.data;
  }
  async restore(id: number): Promise<string> {
    const res = await this._api.axios.patch(`/teacher/restore/${id}`);
    return res.data;
  }


//   async findone(): Promise<string> {
//     const res = await this._api.axios.post("/auth/refresh");
//     return res.data.token;
//   }

  async findAll(query: IPaginationQuery): Promise<IResponse<FindTeacherModel>> {
    const res = await this._api.axios.get("/teacher", { params: query  });
    // console.log("asdfadsf",res.data);
    return res.data;
  }

//   async findAllProvince(): Promise<[]> {
//     const res = await this._api.axios.get("/province");
//     return res.data;
//   }

//   async findAllDistrict(id: number): Promise<[]> {
//     console.log("asdfadsf",id);
//     const res = await this._api.axios.get("/district/" ,{ params: {id } });
//     console.log("asdfadsf",res.data);
//     return res.data;
//   }
}
