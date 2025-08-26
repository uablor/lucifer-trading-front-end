
import { inject, injectable } from 'tsyringe';
import type { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { AuthHttpRepository } from '../../infrastructure/AuthHttpRepository';

@injectable()
export class ResendEmailUseCase {
  constructor(
    @inject(AuthHttpRepository) private _authHttpRepository: IAuthRepository
  ) {}

  async execute(email:string): Promise<string> {

    const res = await this._authHttpRepository.resendEmail(email);

    return res;
  }
}
