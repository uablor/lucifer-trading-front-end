
import { inject, injectable } from 'tsyringe';

import { RoleHttpRepository } from '../../infrastructure/RoleHttpRepository';
import type { IRoleRepository } from '../../domain/repositories/IRoleRepository';
import type { CreateRoleModel } from '../../domain/models/role.model';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class RoleCreateUseCase {

  constructor(
    @inject(RoleHttpRepository) protected _teacherHttpRepository: IRoleRepository
  ) {}
  async execute(requst: CreateRoleModel): Promise<string> {

    const res = await this._teacherHttpRepository.create(requst);
    return res;
    
  } 
}
