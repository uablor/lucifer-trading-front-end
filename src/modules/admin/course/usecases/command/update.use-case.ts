
import { inject, injectable } from 'tsyringe';
import { CourseHttpRepository } from '../../infrastructure/CourseHttpRepository';
import type { ICourseRepository } from '../../domain/repositories/ICourseRepository';
import type { FindCourseModel, UpdateCourseModel } from '../../domain/models/course.model';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class CourseUpdateUseCase {

  constructor(
    @inject(CourseHttpRepository) protected _HttpRepository: ICourseRepository
  ) {}
  async execute(requst: UpdateCourseModel | any): Promise<FindCourseModel> {

    const res = await this._HttpRepository.update(requst);
    return res;
    
  } 
}
