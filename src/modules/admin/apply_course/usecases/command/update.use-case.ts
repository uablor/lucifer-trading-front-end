
import { inject, injectable } from 'tsyringe';
import { ApplyCourseHttpRepository } from '../../infrastructure/ApplyCourseHttpRepository';
import type { IApplyCourseRepository } from '../../domain/repositories/IApply_courseRepository';
import type { FindApplyCourseModel, UpdateApplyCourseModel } from '../../domain/models/apply_course.model';

@injectable()
export class ApplyCourseUpdateUseCase {

  constructor(
    @inject(ApplyCourseHttpRepository) protected _HttpRepository: IApplyCourseRepository
  ) {}
  async execute(requst: UpdateApplyCourseModel): Promise<FindApplyCourseModel> {

    const res = await this._HttpRepository.update(requst);
    return res;
    
  } 
}
