import type { User } from "@/domain/models/user.entity"


export type AuthLoginPayload = Pick<User, "email" | "password">;

export type AuthRegisterPayload = Omit<User, "id">;


