import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type { DeleteType } from "@/shared/enums/deletetype.enum";
import type { ICourseCompletionRepository } from "../domain/repositories/ICourseCompletionRepository";
import type { CreateCourseCompletionModel, FindCourseCompletionModel, UpdateCourseCompletionModel } from "../domain/models/course_completion.model";

@injectable()

export class CourseCompletionHttpRepository implements ICourseCompletionRepository{
  constructor(@inject(AxiosApi) private readonly _api: AxiosApi) {}

  async create(payload: CreateCourseCompletionModel): Promise<string> {
      const res = await this._api.axios.post("/course-completion-records", payload);
      return res.data;
  }

  async update(data: UpdateCourseCompletionModel): Promise<FindCourseCompletionModel> {
    const { id, ...rest } = data;
    console.log(id, rest);
    const res = await this._api.axios.patch("/course-completion-records/" + id, rest);
    return res.data;
  }


  async delete(id: number, type: DeleteType): Promise<string> {
    const res = await this._api.axios.delete(`/course-completion-records/${type}/${id}`);
    return res.data;
  }
  async restore(id: number): Promise<string> {
    const res = await this._api.axios.patch(`/course-completion-records/restore/${id}`);
    return res.data;
  }


  async findAll(query: IPaginationQuery): Promise<IResponse<FindCourseCompletionModel>> {
    const res = await this._api.axios.get("/course-completion-records", { params: query  });
    // console.log("asdfadsf",res.data);
    return res.data;
  }

}
