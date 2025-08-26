import { inject, injectable } from "tsyringe";
import { DeleteType } from "@/shared/enums/deletetype.enum";

import type { IUserAdminRepository } from '../../domain/repositories/IUserAdminRepository';
import { UserAdminHttpRepository } from '../../infrastructure/UserAdminHttpRepository';
  
@injectable()
export class UseradminDeleteUseCase {

constructor(
    @inject(UserAdminHttpRepository) protected _teacherHttpRepository: IUserAdminRepository
  ) {}

  async execute(id: number, type: DeleteType) {
      const res = await this._teacherHttpRepository.delete(id, type);
      return res;
  }
}
