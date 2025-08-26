import type { timestamp } from "@/domain/models/best.timestamp.entity";


export interface PermissionModel extends timestamp {
  id: number;
  name: string;
  display_name: string;
}