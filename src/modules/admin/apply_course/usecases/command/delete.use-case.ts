import { inject, injectable } from "tsyringe";
import { DeleteType } from "@/shared/enums/deletetype.enum";
import { ApplyCourseHttpRepository } from "../../infrastructure/ApplyCourseHttpRepository";
import type { IApplyCourseRepository } from "../../domain/repositories/IApply_courseRepository";

@injectable()
export class ApplyCourseDeleteUseCase {

  constructor(
    @inject(ApplyCourseHttpRepository) protected _HttpRepository: IApplyCourseRepository
  ) {}

  async execute(id: number, type: DeleteType) {
      const res = await this._HttpRepository.delete(id, type);
      return res;
  }
}
