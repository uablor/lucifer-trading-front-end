
import type { timestamp } from "@/domain/models/best.timestamp.entity";
import type { PermissionModel } from "./permission.model";

export interface RoleModel {
  id: number;
  name: string;
  display_name: string;
  permissions: PermissionModel[] | number[];
}

export interface CreateRoleModel extends Omit<RoleModel, "id"> {
}

export interface FindRoleModel extends RoleModel, timestamp {
}

export interface UpdateRoleModel extends RoleModel {}
