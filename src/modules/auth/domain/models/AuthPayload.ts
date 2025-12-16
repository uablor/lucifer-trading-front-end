import type { User } from "@/domain/models/user.entity"


export interface AuthLoginPayload extends Pick<User, "email" | "password"> {}

export interface AuthRegisterPayload extends Omit<User, "id"> {
  confirm: boolean;
  password2: string;
}


