
import { inject, injectable } from 'tsyringe';
// import { TeacherUseCase } from '../best.use-case';
import { TeacherHttpRepository } from '../../infrastructure/TeacherHttpRepository';
import type { ITeacherRepository } from '../../domain/repositories/ITeacherRepository';

@injectable()
export class TeacherRestoreUseCase {
    constructor(
        @inject(TeacherHttpRepository) protected _teacherHttpRepository: ITeacherRepository
    ) {}
  async execute(id: number): Promise<string> {

    const res = await this._teacherHttpRepository.restore(id);
    return res;
    
  }
}
