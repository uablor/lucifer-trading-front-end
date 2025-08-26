import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { IStudentRepository } from "../domain/repositories/IStudentRepository";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type { CreateStudentModel, FindOneStudentModel, FindStudentModel, UpdateStudentModel } from "../domain/models/student.model";
import type { DeleteType } from "@/shared/enums/deletetype.enum";

@injectable()
export class StudentHttpRepository implements IStudentRepository {
  constructor(@inject(AxiosApi) private readonly _api: AxiosApi) {}

  async create(payload: CreateStudentModel): Promise<string> {
      const res = await this._api.axios.post("/student", payload);
      return res.data;
  }

  async update(data: UpdateStudentModel): Promise<FindStudentModel> {
    const { district_id,id, ...rest } = data;
    const request = { ...rest, district:district_id };
    console.log("request",request);
    console.log("id",district_id);
    console.log("data",data);
    const res = await this._api.axios.patch("/student/" + id, request);
    return res.data;
  }


  async delete(id: number, type: DeleteType): Promise<string> {
    const res = await this._api.axios.delete(`/student/${type}/${id}`);
    return res.data;
  }
  async restore(id: number): Promise<string> {
    const res = await this._api.axios.patch(`/student/restore/${id}`);
    return res.data;
  }


  async findone(id:number): Promise<FindOneStudentModel> {
    const res = await this._api.axios.get("/student/"+id);

    return res.data;
  }

  async findAll(query: IPaginationQuery): Promise<IResponse<FindStudentModel>> {
    const res = await this._api.axios.get("/student", { params: query  });
    // console.log("asdfadsf",res.data);
    return res.data;
  }
  async findAllProvince(): Promise<[]> {
    const res = await this._api.axios.get("/province");
    return res.data;
  }

  async findAllDistrict(id: number): Promise<[]> {
    console.log("asdfadsf",id);
    const res = await this._api.axios.get("/district/" ,{ params: {id } });
    console.log("asdfadsf",res.data);
    return res.data;
  }
}
