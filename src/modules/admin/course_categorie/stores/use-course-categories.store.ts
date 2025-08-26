// src/stores/student.store.ts
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type { FindCourseCategoriesModel } from "../domain/models/course_categories.model";
import {
  GetType,
  sortType,
  Status,
} from "@/shared/enums/pagination.query.enum";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
// import { address } from '../../../../domain/models/address.entity';

export const useCourseCategoriesStore = defineStore("use-course-categories-store", () => {
  const state = reactive<IResponse<FindCourseCategoriesModel>>({
    data: [],
    pagination: {
      currentPage: 0,
      limit: 0,
      total: 0,
      count: 0,
      totalPages: 0,
    },
  });

  const query = reactive<IPaginationQuery>({
    page: 1,
    limit: 10,
    search: "",
    type: GetType.PAGE,
    sort: sortType.ASC,
    is_active: Status.ACTIVE,
  });

  return {
    state,
    query,
  };
});
