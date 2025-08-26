import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type { DeleteType } from "@/shared/enums/deletetype.enum";
import type { IApplyCourseRepository } from "../domain/repositories/IApply_courseRepository";
import type { CreateApplyCourseModel, FindApplyCourseModel, UpdateApplyCourseModel } from "../domain/models/apply_course.model";

@injectable()
export class ApplyCourseHttpRepository implements IApplyCourseRepository {
  constructor(@inject(AxiosApi) private readonly _api: AxiosApi) {}

  async create(payload: CreateApplyCourseModel): Promise<string> {
      const res = await this._api.axios.post("/apply-courses", payload);
      return res.data;
  }

  async update(data: UpdateApplyCourseModel): Promise<FindApplyCourseModel> {
    const { id, ...rest } = data;
    console.log(id, rest);
    const res = await this._api.axios.patch("/apply-courses/" + id, rest);
    return res.data;
  }


  async delete(id: number, type: DeleteType): Promise<string> {
    const res = await this._api.axios.delete(`/apply-courses/${type}/${id}`);
    return res.data;
  }
  async restore(id: number): Promise<string> {
    const res = await this._api.axios.patch(`/apply-courses/restore/${id}`);
    return res.data;
  }


  async findAll(query: IPaginationQuery): Promise<IResponse<FindApplyCourseModel>> {
    const res = await this._api.axios.get("/apply-courses", { params: query  });
    // console.log("asdfadsf",res.data);
    return res.data;
  }

}
