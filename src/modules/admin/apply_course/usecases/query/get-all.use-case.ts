import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import { ApplyCourseHttpRepository } from "../../infrastructure/ApplyCourseHttpRepository";
import type { IApplyCourseRepository } from "../../domain/repositories/IApply_courseRepository";
import type { FindApplyCourseModel } from "../../domain/models/apply_course.model";

@injectable()
export class ApplyCourseFindAllUseCase {
  constructor(
    @inject(ApplyCourseHttpRepository) protected _HttpRepository: IApplyCourseRepository
  ) {}

  async execute(query: IPaginationQuery): Promise<IResponse<FindApplyCourseModel>> {
    const res = await this._HttpRepository.findAll(query);
    return res;
  }
}
