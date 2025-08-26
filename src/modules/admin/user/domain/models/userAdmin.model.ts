// import type { address } from "@/domain/models/address.entity";
import type { timestamp } from "@/domain/models/best.timestamp.entity";

export interface UserAdminModel {
  id: number;
  name: string;
  surname: string;
}

export interface CreateUserAdminModel extends Omit<UserAdminModel, "id"> {
  password: string;
  email: string | null;
}

export interface FindUserAdminModel extends UserAdminModel, timestamp {
  email: string;
  is_verified: boolean;
  permissions: string[];
  roles: string[];
}

export interface UpdateUserAdminModel extends UserAdminModel {
  permissions: string[] | number[];
  roles: string[];
}
