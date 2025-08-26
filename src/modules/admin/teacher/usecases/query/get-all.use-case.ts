import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type { FindTeacherModel } from "../../domain/models/teacher.model";
import type { ITeacherRepository } from "../../domain/repositories/ITeacherRepository";
import { TeacherHttpRepository } from "../../infrastructure/TeacherHttpRepository";

@injectable()
export class TeacherFindAllUseCase {
  constructor(
    @inject(TeacherHttpRepository)
    private _teacherHttpRepository: ITeacherRepository
  ) {}

  async execute(query: IPaginationQuery): Promise<IResponse<FindTeacherModel>> {
    const res = await this._teacherHttpRepository.findAll(query);

    return res;
  }
}
