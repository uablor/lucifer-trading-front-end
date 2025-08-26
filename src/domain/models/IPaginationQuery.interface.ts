import type { GetType, sortType, Status } from "@/shared/enums/pagination.query.enum";



export interface IPaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: GetType;
  sort?: sortType;
  is_active?: Status;
}

