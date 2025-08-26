import { inject, injectable } from "tsyringe";
import { DeleteType } from "@/shared/enums/deletetype.enum";
import { CourseHttpRepository } from "../../infrastructure/CourseHttpRepository";
import type { ICourseRepository } from "../../domain/repositories/ICourseRepository";


@injectable()
export class CourseDeleteUseCase {

  constructor(
    @inject(CourseHttpRepository) protected _HttpRepository: ICourseRepository
  ) {}

  async execute(id: number, type: DeleteType) {
      const res = await this._HttpRepository.delete(id, type);
      return res;
  }
}
