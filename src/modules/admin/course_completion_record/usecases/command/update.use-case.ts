
import { inject, injectable } from 'tsyringe';
import { CourseCompletionHttpRepository } from '../../infrastructure/CourseCompleHttpRepository';
import type { ICourseCompletionRepository } from '../../domain/repositories/ICourseCompletionRepository';
import type { FindCourseCompletionModel, UpdateCourseCompletionModel } from '../../domain/models/course_completion.model';

@injectable()
export class CourseCompletionUpdateUseCase {

  constructor(
    @inject(CourseCompletionHttpRepository) protected _HttpRepository: ICourseCompletionRepository
  ) {}
  async execute(requst: UpdateCourseCompletionModel): Promise<FindCourseCompletionModel> {

    const res = await this._HttpRepository.update(requst);
    return res;
    
  } 
}
