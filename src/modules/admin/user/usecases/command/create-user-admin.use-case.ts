
import { inject, injectable } from 'tsyringe';

import type { CreateUserAdminModel } from '../../domain/models/userAdmin.model';
import type { IUserAdminRepository } from '../../domain/repositories/IUserAdminRepository';
import { UserAdminHttpRepository } from '../../infrastructure/UserAdminHttpRepository';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class UseradminCreateUseCase {

  constructor(
    @inject(UserAdminHttpRepository) protected _teacherHttpRepository: IUserAdminRepository
  ) {}
  async execute(requst: CreateUserAdminModel): Promise<string> {

    const res = await this._teacherHttpRepository.create(requst);
    return res;
    
  } 
}
