
import { inject, injectable } from 'tsyringe';
import type { ICourseRepository } from '../../domain/repositories/ICourseRepository';
import { CourseHttpRepository } from '../../infrastructure/CourseHttpRepository';
import type { CreateCourseModel } from '../../domain/models/course.model';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class CourseCreateUseCase {

  constructor(
    @inject(CourseHttpRepository) protected _HttpRepository: ICourseRepository
  ) {}
  async execute(requst: CreateCourseModel): Promise<string> {

    const res = await this._HttpRepository.create(requst);
    return res;
    
  } 
}
