
import { inject, injectable } from 'tsyringe';
import type { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import { StudentHttpRepository } from '../../infrastructure/StudentHttpRepository';
import type { IPaginationQuery } from '@/domain/models/IPaginationQuery.interface';
import type { IResponse } from '@/domain/interfaces/Ipagination.interface';
import type { FindStudentModel } from '../../domain/models/student.model';

@injectable()
export class StudentFindAllUseCase {
  constructor(
    @inject(StudentHttpRepository) private _studentHttpRepository: IStudentRepository
  ) {}

  async execute(query: IPaginationQuery): Promise<IResponse<FindStudentModel>> {

    const res = await this._studentHttpRepository.findAll(query);

    return res;
  }
}
