import type { AxiosResponse } from 'axios'
import type { AuthLoginPayload, AuthRegisterPayload } from '../models/AuthPayload'

export interface IAuthRepository {
  login(payload: AuthLoginPayload): Promise<AxiosResponse>
  register(payload: AuthRegisterPayload): Promise<AxiosResponse>
  logout(): Promise<void>
  refreshToken(): Promise<string>
  verifyEmail(token:string): Promise<string>
  resendEmail(email:string): Promise<string>
}
