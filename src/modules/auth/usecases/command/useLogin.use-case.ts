// src/modules/auth/usecases/LoginUseCase.ts
import { inject, injectable } from 'tsyringe';
// import { AuthDomainService } from '../domain/services/AuthDomainService';
import type { AuthLoginPayload } from '../../domain/models/AuthPayload';
import type { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { AuthHttpRepository } from '../../infrastructure/AuthHttpRepository';
import type { AxiosResponse } from 'axios';

@injectable()
export class LoginUseCase {
  constructor(
    @inject(AuthHttpRepository) private _authHttpRepository: IAuthRepository
  ) {}

  async execute(payload: AuthLoginPayload): Promise<AxiosResponse> {

    // this.authService.validateLogin(payload);
    console.log("sdfsdf",payload);
    const res = await this._authHttpRepository.login(payload);

    return res;
  }
}
