import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import { CourseHttpRepository } from "../../infrastructure/CourseHttpRepository";
import type { ICourseRepository } from "../../domain/repositories/ICourseRepository";
import type { FindCourseModel } from "../../domain/models/course.model";

@injectable()
export class CourseFindAllUseCase {
  constructor(
    @inject(CourseHttpRepository) protected _HttpRepository: ICourseRepository
  ) {}

  async execute(query: IPaginationQuery): Promise<IResponse<FindCourseModel>> {
    const res = await this._HttpRepository.findAll(query);
    return res;
  }
}
