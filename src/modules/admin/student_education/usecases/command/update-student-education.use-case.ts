
import { inject, injectable } from 'tsyringe';

import { StudentEducationHttpRepository } from '../../infrastructure/StudentEducationHttpRepository';
import type { IStudentEducationRepository } from '../../domain/repositories/IStudentEducationRepository';
import type { FindStudentEducationModel, UpdateStudentEducationModel } from '../../domain/models/education.model';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class UpdateUseCase {

  constructor(
    @inject(StudentEducationHttpRepository) protected _stduentEducationHttpRepository: IStudentEducationRepository
  ) {}
  async execute(requst: UpdateStudentEducationModel): Promise<FindStudentEducationModel> {

    const res = await this._stduentEducationHttpRepository.update(requst);
    return res;
    
  } 
}
