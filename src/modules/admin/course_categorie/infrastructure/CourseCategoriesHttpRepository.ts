import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { ICourseCategoriesRepository } from "../domain/repositories/ICourseCategoriesRepository";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";import type { DeleteType } from "@/shared/enums/deletetype.enum";
import type { CreateCourseCategoriesModel, FindCourseCategoriesModel, UpdateCourseCategoriesModel } from "../domain/models/course_categories.model";

@injectable()
export class CourseCategoriesHttpRepository implements ICourseCategoriesRepository {
  constructor(@inject(AxiosApi) private readonly _api: AxiosApi) {}

  async create(payload: CreateCourseCategoriesModel): Promise<string> {
      const res = await this._api.axios.post("/course_category", payload);
      return res.data;
  }

  async update(data: UpdateCourseCategoriesModel): Promise<FindCourseCategoriesModel> {
    const { id, ...rest } = data;
    console.log(id, rest);
    const res = await this._api.axios.patch("/course_category/" + id, rest);
    return res.data;
  }


  async delete(id: number, type: DeleteType): Promise<string> {
    const res = await this._api.axios.delete(`/course_category/${type}/${id}`);
    return res.data;
  }
  async restore(id: number): Promise<string> {
    const res = await this._api.axios.patch(`/course_category/restore/${id}`);
    return res.data;
  }


//   async findone(): Promise<string> {
//     const res = await this._api.axios.post("/auth/refresh");
//     return res.data.token;
//   }

  async findAll(query: IPaginationQuery): Promise<IResponse<FindCourseCategoriesModel>> {
    const res = await this._api.axios.get("/course_category", { params: query  });
    // console.log("asdfadsf",res.data);
    return res.data;
  }

}
