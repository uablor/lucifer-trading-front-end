
import { inject, injectable } from 'tsyringe';
import { CourseCategoriesHttpRepository } from '../../infrastructure/CourseCategoriesHttpRepository';
import type { ICourseCategoriesRepository } from '../../domain/repositories/ICourseCategoriesRepository';
import type { FindCourseCategoriesModel, UpdateCourseCategoriesModel } from '../../domain/models/course_categories.model';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class CourseCategoriesUpdateUseCase {

  constructor(
    @inject(CourseCategoriesHttpRepository) protected _HttpRepository: ICourseCategoriesRepository
  ) {}
  async execute(requst: UpdateCourseCategoriesModel): Promise<FindCourseCategoriesModel> {

    const res = await this._HttpRepository.update(requst);
    return res;
    
  } 
}
