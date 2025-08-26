import { inject, injectable } from "tsyringe";
import { DeleteType } from "@/shared/enums/deletetype.enum";
import { TeacherHttpRepository } from "../../infrastructure/TeacherHttpRepository";
import type { ITeacherRepository } from "../../domain/repositories/ITeacherRepository";
// import { TeacherUseCase } from "../best.use-case";

@injectable()
export class TeacherDeleteUseCase {

    constructor(
        @inject(TeacherHttpRepository) protected _teacherHttpRepository: ITeacherRepository
    ) {}

  async execute(id: number, type: DeleteType) {
      const res = await this._teacherHttpRepository.delete(id, type);
      return res;
  }
}
