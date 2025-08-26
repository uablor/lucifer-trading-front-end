
import { inject, injectable } from 'tsyringe';
import type { IStudentRepository } from '../../domain/repositories/IStudentRepository';
import { StudentHttpRepository } from '../../infrastructure/StudentHttpRepository';

@injectable()
export class DistrictFindUseCase {
  constructor(
    @inject(StudentHttpRepository) private _studentHttpRepository: IStudentRepository
  ) {}

  async execute(id: number): Promise<[]> {

    const res = await this._studentHttpRepository.findAllDistrict(id);
    return res;
  }
}
