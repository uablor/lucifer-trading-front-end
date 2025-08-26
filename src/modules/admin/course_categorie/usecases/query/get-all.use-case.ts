import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import { CourseCategoriesHttpRepository } from "../../infrastructure/CourseCategoriesHttpRepository";
import type { ICourseCategoriesRepository } from "../../domain/repositories/ICourseCategoriesRepository";
import type { FindCourseCategoriesModel } from "../../domain/models/course_categories.model";

@injectable()
export class CourseCategoriesFindAllUseCase {
  constructor(
    @inject(CourseCategoriesHttpRepository) protected _HttpRepository: ICourseCategoriesRepository
  ) {}

  async execute(query: IPaginationQuery): Promise<IResponse<FindCourseCategoriesModel>> {
    const res = await this._HttpRepository.findAll(query);

    return res;
  }
}
