import { inject, injectable } from "tsyringe";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import { StudentEducationHttpRepository } from "../../infrastructure/StudentEducationHttpRepository";
import type { IStudentEducationRepository } from "../../domain/repositories/IStudentEducationRepository";
import type { FindStudentEducationModel } from "../../domain/models/education.model";

@injectable()
export class FindAllUseCase {
  constructor(
    @inject(StudentEducationHttpRepository) protected _stduentEducationHttpRepository: IStudentEducationRepository
  ) {}
  async execute(query: IPaginationQuery): Promise<IResponse<FindStudentEducationModel>> {
    const res = await this._stduentEducationHttpRepository.findAll(query);

    return res;
  }
}
