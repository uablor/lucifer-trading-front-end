import type { IAuthRepository } from "../domain/repositories/IAuthRepository";
import type { AuthLoginPayload, AuthRegisterPayload } from "../domain/models/AuthPayload";
import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { AxiosResponse } from "axios";

@injectable()
export class AuthHttpRepository implements IAuthRepository {

  constructor(
    @inject(AxiosApi) private readonly _api: AxiosApi,
  ) {

  }

  async login(payload: AuthLoginPayload): Promise<AxiosResponse> {
      const res = await this._api.axios({
        method: "POST",
        url: "/auth/login/",
        data: {...payload}});
      return res;
    
  }

  async register(payload: AuthRegisterPayload): Promise<AxiosResponse> {
    const {confirm, ...data} = payload;
    const res = await this._api.axios({
      method: "POST",
      url: "/user/register/",
      data: {...data}
    });
    return res;
  }

  async logout(): Promise<void> {
    await this._api.axios.post("/auth/logout");
    // this.logger.info("User logged out");
  }

  async refreshToken(): Promise<string> {
    const res = await this._api.axios.post("/auth/refresh");
    return res.data.token;
  }

  async verifyEmail(token: string): Promise<string> {
    const res = await this._api.axios.post("/mail", { parms: token });
    return res.data;
  }

  async resendEmail(email: string): Promise<string> {
    const res = await this._api.axios.post("/mail", { parms: email });
    return res.data;
  }
}
