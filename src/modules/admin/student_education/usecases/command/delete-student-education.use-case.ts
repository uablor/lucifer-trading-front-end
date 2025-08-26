import { inject, injectable } from "tsyringe";
import { DeleteType } from "@/shared/enums/deletetype.enum";

import { StudentEducationHttpRepository } from "../../infrastructure/StudentEducationHttpRepository";
import type { IStudentEducationRepository } from "../../domain/repositories/IStudentEducationRepository";

@injectable()
export class DeleteUseCase {

  constructor(
    @inject(StudentEducationHttpRepository) protected _stduentEducationHttpRepository: IStudentEducationRepository
  ) {}

  async execute(id: number, type: DeleteType) {
      const res = await this._stduentEducationHttpRepository.delete(id, type);
      return res;
  }
}
