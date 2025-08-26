import { inject, injectable } from "tsyringe";
import type { IStudentRepository } from "../../domain/repositories/IStudentRepository";
import { StudentHttpRepository } from "../../infrastructure/StudentHttpRepository";
import { DeleteType } from "@/shared/enums/deletetype.enum";

@injectable()
export class StudentDeleteUseCase {
  constructor(
    @inject(StudentHttpRepository)
    private _studentHttpRepository: IStudentRepository
  ) {}

  async execute(id: number, type: DeleteType) {
      const res = await this._studentHttpRepository.delete(id, type);
      return res;
  }
}
