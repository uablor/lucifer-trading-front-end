
import { inject, injectable } from 'tsyringe';
import { CourseCategoriesHttpRepository } from '../../infrastructure/CourseCategoriesHttpRepository';
import type { ICourseCategoriesRepository } from '../../domain/repositories/ICourseCategoriesRepository';
import type { CreateCourseCategoriesModel } from '../../domain/models/course_categories.model';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class CourseCategoriesCreateUseCase {

  constructor(
    @inject(CourseCategoriesHttpRepository) protected _HttpRepository: ICourseCategoriesRepository
  ) {}
  async execute(requst: CreateCourseCategoriesModel): Promise<string> {

    const res = await this._HttpRepository.create(requst);
    return res;
    
  } 
}
