
import { inject, injectable } from 'tsyringe';
import type { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import { StudentHttpRepository } from '../../infrastructure/StudentHttpRepository';
// import type { IPaginationQuery } from '@/domain/models/IPaginationQuery.interface';
// import type { IResponse } from '@/domain/interfaces/Ipagination.interface';
// import type { FindStudentModel } from '../../domain/models/student.model';

@injectable()
export class ProvinceFindAllUseCase {
  constructor(
    @inject(StudentHttpRepository) private _studentHttpRepository: IStudentRepository
  ) {}

  async execute(): Promise<[]> {

    const res = await this._studentHttpRepository.findAllProvince();
    return res;
  }
}
