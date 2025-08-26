import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import { CourseCompletionHttpRepository } from "../../infrastructure/CourseCompleHttpRepository";
import type { ICourseCompletionRepository } from "../../domain/repositories/ICourseCompletionRepository";
import type { FindCourseCompletionModel } from "../../domain/models/course_completion.model";

@injectable()
export class CourseCompletionFindAllUseCase {
  constructor(
    @inject(CourseCompletionHttpRepository) protected _HttpRepository: ICourseCompletionRepository
  ) {}

  async execute(query: IPaginationQuery): Promise<IResponse<FindCourseCompletionModel>> {
    const res = await this._HttpRepository.findAll(query);
    return res;
  }
}
