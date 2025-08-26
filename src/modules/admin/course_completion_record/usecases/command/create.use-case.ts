
import { inject, injectable } from 'tsyringe';
import type { ICourseCompletionRepository } from '../../domain/repositories/ICourseCompletionRepository';
import { CourseCompletionHttpRepository } from '../../infrastructure/CourseCompleHttpRepository';
import type { CreateCourseCompletionModel } from '../../domain/models/course_completion.model';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class CourseCompletionCreateUseCase {

  constructor(
    @inject(CourseCompletionHttpRepository) protected _HttpRepository: ICourseCompletionRepository
  ) {}
  async execute(requst: CreateCourseCompletionModel): Promise<string> {

    const res = await this._HttpRepository.create(requst);
    return res;
    
  } 
}
