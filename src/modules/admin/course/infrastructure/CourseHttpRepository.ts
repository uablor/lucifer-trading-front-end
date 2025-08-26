import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type { DeleteType } from "@/shared/enums/deletetype.enum";
import type { CreateCourseModel, FindCourseModel, UpdateCourseModel } from "../domain/models/course.model";
import type { ICourseRepository } from "../domain/repositories/ICourseRepository";

@injectable()
export class CourseHttpRepository implements ICourseRepository {
  constructor(@inject(AxiosApi) private readonly _api: AxiosApi) {}

  async create(payload: CreateCourseModel): Promise<string> {
      const res = await this._api.axios.post("/course", payload);
      return res.data;
  }

  async update(data: UpdateCourseModel): Promise<FindCourseModel> {
    const { id, ...rest } = data;
    console.log(id, rest);
    const res = await this._api.axios.patch("/course/" + id, rest);
    return res.data;
  }


  async delete(id: number, type: DeleteType): Promise<string> {
    const res = await this._api.axios.delete(`/course/${type}/${id}`);
    return res.data;
  }
  async restore(id: number): Promise<string> {
    const res = await this._api.axios.patch(`/course/restore/${id}`);
    return res.data;
  }


  async findAll(query: IPaginationQuery): Promise<IResponse<FindCourseModel>> {
    const res = await this._api.axios.get("/course", { params: query  });
    // console.log("asdfadsf",res.data);
    return res.data;
  }

}
