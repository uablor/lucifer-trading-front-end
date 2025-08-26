// src/stores/student.store.ts
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";
import type { FindStudentEducationModel } from "../domain/models/education.model";
import {
  GetType,
  sortType,
  Status,
} from "@/shared/enums/pagination.query.enum";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { FindOneStudentModel } from "../../student/domain/models/student.model";
// import { address } from '../../../../domain/models/address.entity';

export const useStudentEducationStore = defineStore("use-student-education-store", () => {
  const state = reactive<IResponse<FindStudentEducationModel>>({
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

  const student = reactive<{ data: FindOneStudentModel }>({
    data: {} as FindOneStudentModel,
  });

  return {
    state,
    query,
    student
  };
});
