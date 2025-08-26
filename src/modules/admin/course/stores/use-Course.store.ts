// src/stores/student.store.ts
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import {
  GetType,
  sortType,
  Status,
} from "@/shared/enums/pagination.query.enum";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { FindCourseModel } from "../domain/models/course.model";

export const useCourseStore = defineStore("use-course-store", () => {
  const state = reactive<IResponse<FindCourseModel>>({
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
    query
  };
});
