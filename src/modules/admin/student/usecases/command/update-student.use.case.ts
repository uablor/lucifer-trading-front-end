
import { inject, injectable } from 'tsyringe';
import type { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import { StudentHttpRepository } from '../../infrastructure/StudentHttpRepository';
import type { FindStudentModel, UpdateStudentModel } from '../../domain/models/student.model';

@injectable()
export class StudentUpdateUseCase {
  constructor(
    @inject(StudentHttpRepository) private _studentHttpRepository: IStudentRepository
  ) {}

  async execute(data: UpdateStudentModel): Promise<FindStudentModel> {
    const res = await this._studentHttpRepository.update(data);

    return res;
  }
}
