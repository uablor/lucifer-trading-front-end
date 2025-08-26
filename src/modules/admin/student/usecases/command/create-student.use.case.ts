
import { inject, injectable } from 'tsyringe';
import type { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import { StudentHttpRepository } from '../../infrastructure/StudentHttpRepository';
import type { CreateStudentModel } from '../../domain/models/student.model';

@injectable()
export class StudentCreateUseCase {
  constructor(
    @inject(StudentHttpRepository) private _studentHttpRepository: IStudentRepository
  ) {}

  async execute(requst: CreateStudentModel): Promise<string> {

    const res = await this._studentHttpRepository.create(requst);

    return res;
  }
}
