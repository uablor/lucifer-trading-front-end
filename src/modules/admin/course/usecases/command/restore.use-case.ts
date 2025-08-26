
import { inject, injectable } from 'tsyringe';
import { CourseHttpRepository } from '../../infrastructure/CourseHttpRepository';
import type { ICourseRepository } from '../../domain/repositories/ICourseRepository';


@injectable()
export class CourseRestoreUseCase {
  constructor(
    @inject(CourseHttpRepository) protected _HttpRepository: ICourseRepository
  ) {}
  async execute(id: number): Promise<string> {

    const res = await this._HttpRepository.restore(id);
    return res;
    
  }
}
