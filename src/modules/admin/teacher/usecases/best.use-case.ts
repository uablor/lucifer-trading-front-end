import { inject, injectable } from "tsyringe";
import { TeacherHttpRepository } from "../infrastructure/TeacherHttpRepository";
import type { ITeacherRepository } from "../domain/repositories/ITeacherRepository";

@injectable()
export class TeacherUseCase {
  constructor(
 @inject(TeacherHttpRepository) protected _teacherHttpRepository: ITeacherRepository
  ) {}
}
