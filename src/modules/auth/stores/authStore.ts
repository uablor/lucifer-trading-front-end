
// src/modules/auth/stores/authStore.ts
import { defineStore } from 'pinia';
import type { AuthLoginPayload, AuthRegisterPayload } from '../domain/models/AuthPayload';
import { RegisterUseCase } from '../usecases/command/useRegiste.use-case';
import { container } from 'tsyringe';
import { LoginUseCase } from '../usecases/command/useLogin.use-case';


export const useAuthStore = defineStore('auth', () => {

  const login = async (payload : AuthLoginPayload) => {
    const loginUseCase = container.resolve(LoginUseCase);
    const result = await loginUseCase.execute(payload);
    return result;
  };

  const register = async (payload: AuthRegisterPayload) => {
    const registerUseCase = container.resolve(RegisterUseCase);
    const result = await registerUseCase.execute(payload);
    return result;
  };

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    
    sessionStorage.clear();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return { login,register,logout };
});