
import { inject, injectable } from 'tsyringe';

import type {  FindRoleModel, UpdateRoleModel } from '../../domain/models/role.model';
import type { IRoleRepository } from '../../domain/repositories/IRoleRepository';
import { RoleHttpRepository } from '../../infrastructure/RoleHttpRepository';

// @injectable()
// export class TeacherCreateUseCase extends TeacherUseCase {

//   async execute(requst: CreateTeacherModel): Promise<string> {

//     const res = await this._teacherHttpRepository.create(requst);
//     return res;
    
//   }
// }

@injectable()
export class RoleUpdateUseCase {

  constructor(
    @inject(RoleHttpRepository) protected _teacherHttpRepository: IRoleRepository
  ) {}
  async execute(requst: UpdateRoleModel): Promise<FindRoleModel> {

    const res = await this._teacherHttpRepository.update(requst);
    return res;
    
  } 
}
