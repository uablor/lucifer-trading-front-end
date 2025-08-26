
import { inject, injectable } from 'tsyringe';
import type { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import { StudentHttpRepository } from '../../infrastructure/StudentHttpRepository';
import type { FindOneStudentModel } from '../../domain/models/student.model';

@injectable()
export class StudentFindOneUseCase {
  constructor(
    @inject(StudentHttpRepository) private _studentHttpRepository: IStudentRepository
  ) {}

  async execute(id: number): Promise<FindOneStudentModel> {

    const res = await this._studentHttpRepository.findone(id);

    return res;
  }
}
