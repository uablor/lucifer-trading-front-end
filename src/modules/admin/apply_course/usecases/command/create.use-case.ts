
import { inject, injectable } from 'tsyringe';
import { ApplyCourseHttpRepository } from '../../infrastructure/ApplyCourseHttpRepository';
import type { IApplyCourseRepository } from '../../domain/repositories/IApply_courseRepository';
import type { CreateApplyCourseModel } from '../../domain/models/apply_course.model';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class ApplyCourseCreateUseCase {

  constructor(
    @inject(ApplyCourseHttpRepository) protected _HttpRepository: IApplyCourseRepository
  ) {}
  async execute(requst: CreateApplyCourseModel): Promise<string> {

    const res = await this._HttpRepository.create(requst);
    return res;
    
  } 
}
