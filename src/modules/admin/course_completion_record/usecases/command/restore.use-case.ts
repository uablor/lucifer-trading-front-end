
import { inject, injectable } from 'tsyringe';
import { CourseCompletionHttpRepository } from '../../infrastructure/CourseCompleHttpRepository';
import type { ICourseCompletionRepository } from '../../domain/repositories/ICourseCompletionRepository';


@injectable()
export class CourseCompletionRestoreUseCase {
  constructor(
    @inject(CourseCompletionHttpRepository) protected _HttpRepository: ICourseCompletionRepository
  ) {}
  async execute(id: number): Promise<string> {

    const res = await this._HttpRepository.restore(id);
    return res;
    
  }
}
