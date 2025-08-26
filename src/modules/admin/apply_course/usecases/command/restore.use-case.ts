
import { inject, injectable } from 'tsyringe';
import { ApplyCourseHttpRepository } from '../../infrastructure/ApplyCourseHttpRepository';
import type { IApplyCourseRepository } from '../../domain/repositories/IApply_courseRepository';


@injectable()
export class ApplyCourseRestoreUseCase {
  constructor(
    @inject(ApplyCourseHttpRepository) protected _HttpRepository: IApplyCourseRepository

  ) {}
  async execute(id: number): Promise<string> {

    const res = await this._HttpRepository.restore(id);
    return res;
    
  }
}
