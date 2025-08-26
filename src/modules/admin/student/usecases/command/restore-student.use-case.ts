import { inject, injectable } from "tsyringe";
import type { IStudentRepository } from "../../domain/repositories/IStudentRepository";
import { StudentHttpRepository } from "../../infrastructure/StudentHttpRepository";
// import { DeleteType } from "@/shared/enums/deletetype.enum";

@injectable()
export class RestoreStudentUseCase {
  constructor(
    @inject(StudentHttpRepository)
    private _studentHttpRepository: IStudentRepository
  ) {}

  async execute(id: number) {
      const res = await this._studentHttpRepository.restore(id);
      return res;
  }
}
