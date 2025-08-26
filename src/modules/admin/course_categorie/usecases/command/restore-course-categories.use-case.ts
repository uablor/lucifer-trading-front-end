
import { inject, injectable } from 'tsyringe';
import { CourseCategoriesHttpRepository } from '../../infrastructure/CourseCategoriesHttpRepository';
import type { ICourseCategoriesRepository } from '../../domain/repositories/ICourseCategoriesRepository';

@injectable()
export class CourseCategoriesRestoreUseCase {
  constructor(
    @inject(CourseCategoriesHttpRepository) protected _HttpRepository: ICourseCategoriesRepository
  ) {}
  async execute(id: number): Promise<string> {

    const res = await this._HttpRepository.restore(id);
    return res;
    
  }
}
