import { inject, injectable } from "tsyringe";
import { DeleteType } from "@/shared/enums/deletetype.enum";
import { RoleHttpRepository } from "../../infrastructure/RoleHttpRepository";
import type { IRoleRepository } from "../../domain/repositories/IRoleRepository";

@injectable()
export class RoleDeleteUseCase {

     constructor(
       @inject(RoleHttpRepository) protected _teacherHttpRepository: IRoleRepository
     ) {}

  async execute(id: number, type: DeleteType) {
      const res = await this._teacherHttpRepository.delete(id, type);
      return res;
  }
}
