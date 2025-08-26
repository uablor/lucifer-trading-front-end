import { inject, injectable } from "tsyringe";
import { DeleteType } from "@/shared/enums/deletetype.enum";
import { CourseCompletionHttpRepository } from "../../infrastructure/CourseCompleHttpRepository";
import type { ICourseCompletionRepository } from "../../domain/repositories/ICourseCompletionRepository";


@injectable()
export class CourseCompletionDeleteUseCase {

  constructor(
    @inject(CourseCompletionHttpRepository) protected _HttpRepository: ICourseCompletionRepository
  ) {}

  async execute(id: number, type: DeleteType) {
      const res = await this._HttpRepository.delete(id, type);
      return res;
  }
}
