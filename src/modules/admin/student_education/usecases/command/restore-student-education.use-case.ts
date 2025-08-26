
import { inject, injectable } from 'tsyringe';
import { StudentEducationHttpRepository, } from '../../infrastructure/StudentEducationHttpRepository';
import type { IStudentEducationRepository, } from '../../domain/repositories/IStudentEducationRepository';

@injectable()
export class RestoreUseCase {
  constructor(
    @inject(StudentEducationHttpRepository) protected _stduentEducationHttpRepository: IStudentEducationRepository
  ) {}
  async execute(id: number): Promise<string> {

    const res = await this._stduentEducationHttpRepository.restore(id);
    return res;
    
  }
}
