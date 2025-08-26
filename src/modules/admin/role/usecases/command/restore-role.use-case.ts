
import { inject, injectable } from 'tsyringe';
import { RoleHttpRepository } from '../../infrastructure/RoleHttpRepository';
import type { IRoleRepository } from '../../domain/repositories/IRoleRepository';

@injectable()
export class RoleRestoreUseCase {
  constructor(
    @inject(RoleHttpRepository) protected _teacherHttpRepository: IRoleRepository
  ) {}
  async execute(id: number): Promise<string> {

    const res = await this._teacherHttpRepository.restore(id);
    return res;
    
  }
}
