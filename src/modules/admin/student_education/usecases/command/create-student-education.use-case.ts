
import { inject, injectable } from 'tsyringe';

import type { IStudentEducationRepository } from '../../domain/repositories/IStudentEducationRepository';
import { StudentEducationHttpRepository } from '../../infrastructure/StudentEducationHttpRepository';
import type { CreateStudentEducationModel } from '../../domain/models/education.model';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class CreateUseCase {

  constructor(
    @inject(StudentEducationHttpRepository) protected _stduentEducationHttpRepository: IStudentEducationRepository
  ) {}
  async execute(requst: CreateStudentEducationModel): Promise<string> {

    const res = await this._stduentEducationHttpRepository.create(requst);
    return res;
    
  } 
}
