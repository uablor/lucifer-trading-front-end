
import { inject, injectable } from 'tsyringe';
import type { FindUserAdminModel, UpdateUserAdminModel } from '../../domain/models/userAdmin.model';
import { UserAdminHttpRepository } from '../../infrastructure/UserAdminHttpRepository';
import type { IUserAdminRepository } from '../../domain/repositories/IUserAdminRepository';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class UseradminUpdateUseCase {

   constructor(
    @inject(UserAdminHttpRepository) protected _teacherHttpRepository: IUserAdminRepository
  ) {}
  async execute(requst: UpdateUserAdminModel): Promise<FindUserAdminModel> {

    const res = await this._teacherHttpRepository.update(requst);
    return res;
    
  } 
}
