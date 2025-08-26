import router from "@/router";
import type { AxiosInstance } from "axios";
import axios from "axios";
import { singleton } from "tsyringe";
@singleton()
export class AxiosApi {
  public axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API_URL,
    });
    this.setupInterceptors();
  }


  private setupInterceptors() {
    this.axios.interceptors.request.use(
      async (config: any) => {
        const session = sessionStorage.getItem("user");
        const accessToken = localStorage.getItem("token");
        const user = session ? JSON.parse(session) : null;

        if (user && Date.now() >= user.exp_in) {
          // TODO: refresh token
        }

        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error: any) => Promise.reject(error)
    );

    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const message = error.response?.data.message;

        if (message === "Token_expired") {
          await router.push({ name: "auth.token-expired" })
          localStorage.removeItem("token");
        } else if (message === "Permission_not_found") {
          await router.push({ name: "auth.token-expired" })
        }
        return Promise.reject(error);
      }
    );
  }
}


