
import { inject, injectable } from 'tsyringe';
import type { IUserAdminRepository } from '../../domain/repositories/IUserAdminRepository';
import { UserAdminHttpRepository } from '../../infrastructure/UserAdminHttpRepository';



@injectable()
export class UseradminRestoreUseCase {
     constructor(
    @inject(UserAdminHttpRepository) protected _teacherHttpRepository: IUserAdminRepository
  ) {}
  async execute(id: number): Promise<string> {

    const res = await this._teacherHttpRepository.restore(id);
    return res;
    
  }
}
