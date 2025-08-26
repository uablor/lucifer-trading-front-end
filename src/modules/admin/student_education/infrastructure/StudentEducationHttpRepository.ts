import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { IStudentEducationRepository } from "../domain/repositories/IStudentEducationRepository";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";import type { DeleteType } from "@/shared/enums/deletetype.enum";
import type { CreateStudentEducationModel, FindStudentEducationModel, UpdateStudentEducationModel } from "../domain/models/education.model";

@injectable()
export class StudentEducationHttpRepository implements IStudentEducationRepository {
  constructor(@inject(AxiosApi) private readonly _api: AxiosApi) {}

  async create(payload: CreateStudentEducationModel): Promise<string> {
      const res = await this._api.axios.post("/education", payload);
      return res.data;
  }

  async update(data: UpdateStudentEducationModel): Promise<FindStudentEducationModel> {
    const { id, ...rest } = data;
    console.log(id, rest);
    const res = await this._api.axios.patch("/education/" + id, rest);
    return res.data;
  }


  async delete(id: number, type: DeleteType): Promise<string> {
    const res = await this._api.axios.delete(`/education/${type}/${id}`);
    return res.data;
  }
  async restore(id: number): Promise<string> {
    const res = await this._api.axios.patch(`/education/restore/${id}`);
    return res.data;
  }
  async findAll(query: IPaginationQuery): Promise<IResponse<FindStudentEducationModel>> {
    const res = await this._api.axios.get("/education", { params: query  });
    return res.data;
  }

}
