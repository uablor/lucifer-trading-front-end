
import { inject, injectable } from 'tsyringe';
import type { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { AuthHttpRepository } from '../../infrastructure/AuthHttpRepository';

@injectable()
export class VerifyEmailUseCase {
  constructor(
    @inject(AuthHttpRepository) private _authHttpRepository: IAuthRepository
  ) {}

  async execute(token:string): Promise<string> {

    const res = await this._authHttpRepository.verifyEmail(token);

    return res;
  }
}
