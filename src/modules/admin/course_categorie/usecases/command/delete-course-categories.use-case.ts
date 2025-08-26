import { inject, injectable } from "tsyringe";
import { DeleteType } from "@/shared/enums/deletetype.enum";
import { CourseCategoriesHttpRepository } from "../../infrastructure/CourseCategoriesHttpRepository";
import type { ICourseCategoriesRepository } from "../../domain/repositories/ICourseCategoriesRepository";


@injectable()
export class CourseCategoriesDeleteUseCase {

  constructor(
    @inject(CourseCategoriesHttpRepository) protected _HttpRepository: ICourseCategoriesRepository
  ) {}

  async execute(id: number, type: DeleteType) {
      const res = await this._HttpRepository.delete(id, type);
      return res;
  }
}
