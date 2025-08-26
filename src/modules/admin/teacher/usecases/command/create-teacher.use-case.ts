
import { inject, injectable } from 'tsyringe';

import type { CreateTeacherModel } from '../../domain/models/teacher.model';
// import { TeacherUseCase } from '../best.use-case';
import type { ITeacherRepository } from '../../domain/repositories/ITeacherRepository';
import { TeacherHttpRepository } from '../../infrastructure/TeacherHttpRepository';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class TeacherCreateUseCase {

  constructor(
    @inject(TeacherHttpRepository) protected _teacherHttpRepository: ITeacherRepository
  ) {}
  async execute(requst: CreateTeacherModel): Promise<string> {

    const res = await this._teacherHttpRepository.create(requst);
    return res;
    
  } 
}
