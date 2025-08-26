import { ref, reactive } from "vue";
import { injectable } from "tsyringe";
import { message } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import { useI18n } from "vue-i18n";

import type { Rule } from "ant-design-vue/es/form";

import { container } from "tsyringe";
import { type IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import { DeleteType } from "@/shared/enums/deletetype.enum";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "@/domain/models/IErrorResponse.interface";
import { parseDate } from "@utils/format.date";
import { useCourseCompletionStore } from "../stores/use-Couese-Comple.store";
import { CourseCompletionFindAllUseCase } from "../usecases/query/get-all.use-case";
import { CourseCompletionUpdateUseCase } from "../usecases/command/update.use-case";
import { CourseCompletionDeleteUseCase } from "../usecases/command/delete.use-case";
import { CourseCompletionRestoreUseCase } from "../usecases/command/restore.use-case";
import { CourseCompletionStatus, type CreateCourseCompletionModel, type UpdateCourseCompletionModel } from "../domain/models/course_completion.model";
import { CourseCompletionCreateUseCase } from "../usecases/command/create.use-case";

@injectable()
export default class CourseCompletionFormService {
  t = useI18n().t;
  store = useCourseCompletionStore();

  open_edit = ref<boolean>(false);
  open_create = ref<boolean>(false);
  open_delete = ref<boolean>(false);

  find_loading = ref<boolean>(false);
  create_loading = ref<boolean>(false);
  update_loading = ref<boolean>(false);
  isDeleting = ref<boolean>(false);

  rules: Record<string, Rule[]>;
  formRef = ref<FormInstance | null>(null);

  editFormRef = ref<FormInstance | null>(null);
  creat_loading = ref<boolean>(false);
  columns: any[];

  isHardDelete = ref<boolean>(false);

  delete_id = ref<number>(0);

  constructor(
    private readonly _FindAllUseCase = container.resolve(CourseCompletionFindAllUseCase),

    private readonly _createUseCase = container.resolve(CourseCompletionCreateUseCase),
    private readonly _updateUseCase = container.resolve(CourseCompletionUpdateUseCase),
    private readonly _deleteUseCase = container.resolve(CourseCompletionDeleteUseCase),
    private readonly _restoreUseCase = container.resolve(CourseCompletionRestoreUseCase)
  ) {
    const { t } = useI18n();

    this.rules = {
      title: [{ required: true, message: t("validation.required_name") }],
      teacher: [{ required: true, message: t("validation.required_surname") }],
      category: [{ required: true, message: t("validation.required_email") }],
      price: [
        { required: true, message: t("validation.required_password") },
        { type: "number", message: t("validation.password_min") },
      ],
      max_student: [
        { required: true, message: t("validation.required_specialization") },
      ],
      
      description: [
        { required: true, message: t("validation.required_education") },
      ],
      duration_hours: [
        { required: true, message: t("validation.required_education") },
      ],
      status: [{ required: true, message: t("validation.required_education") }],
    };

    this.columns = [
      {
        title: this.t("table.index"),
        key: "index",
        fixed: "left",
        width: 70,
      },
      {
        title: this.t("table.apply_course"),
        dataIndex: ["apply_course", "price"],
        key: "apply_course_price",
        fixed: "left",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("table.apply_course"),
        dataIndex: ["apply_course", "status"],
        key: "apply_course_status",
        fixed: "left",
        width: 150,
        ellipsis: true,
      },

      {
        title: this.t("table.total_score"),
        dataIndex: "total_score",
        key: "total_scoretotal_score",
        width: 100,
        ellipsis: true,
      },
      {
        title: this.t("table.is_certified"),
        dataIndex: "is_certified",
        key: "is_certified",
        width: 100,
        ellipsis: true,
      },
      {
        title: this.t("table.completion_date"),
        dataIndex: "completion_date",
        key: "completion_date",
        width: 150,
        ellipsis: true,
      },

      {
        title: this.t("table.certificate_issued_date"),
        dataIndex: "certificate_issued_date",
        key: "certificate_issued_date",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("table.total_study_hours"),
        dataIndex: "total_study_hours",
        key: "total_study_hours",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("table.created_by"),
        dataIndex:[ "created_by", "name"],
        key: "created_by_name",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("table.status"),
        dataIndex: "status",
        key: "status",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("table.createdAt"),
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("table.updatedAt"),
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("table.action"),
        key: "action",
        fixed: "right",
        width: 170,
      },
    ];
  }

  deleteType = reactive({ softdelete: DeleteType.SOFT });

  form_create = reactive<CreateCourseCompletionModel>({
    apply_courses: null,
    total_score: null,
    // price: null,
    is_certified: false,
    status: CourseCompletionStatus.INCOMPLETED,
    completion_date: "",
    certificate_issued_date: "",
    total_study_hours: null,
  });

  form_edit = reactive<UpdateCourseCompletionModel>({
    id: 0,
    apply_courses: null,
    total_score: null,
    price: null,
    is_certified: false,
    status: CourseCompletionStatus.INCOMPLETED,
    completion_date: "",
    certificate_issued_date: "",
    total_study_hours: null,
  });

  resetForm = () => {
    this.form_create.apply_courses = 0;
    this.form_create.total_score = 0;
    // this.form_create.price = 0;
    this.form_create.is_certified = false;
    this.form_create.status = CourseCompletionStatus.INCOMPLETED;
    this.form_create.completion_date = "";
    this.form_create.certificate_issued_date = "";
    this.form_create.total_study_hours = 0;

    this.form_edit.id = 0;
    this.form_edit.apply_courses = 0;
    this.form_edit.total_score = 0;
    this.form_edit.price = 0;
    this.form_edit.is_certified = false;
    this.form_edit.status = CourseCompletionStatus.INCOMPLETED;
    this.form_edit.completion_date = "";
    this.form_edit.certificate_issued_date = "";
    this.form_edit.total_study_hours = 0; 

    this.delete_id.value = 0;
  };

  fetchPage = async (query: IPaginationQuery) => {
    try {
      this.find_loading.value = true;
      const response = await this._FindAllUseCase.execute(query);
      this.store.state.data = response.data;
      this.store.state.pagination = {
        total: response.pagination.total,
        count: response.pagination.count,
        totalPages: response.pagination.totalPages,
        currentPage: response.pagination.currentPage,
        limit: response.pagination.limit,
      };
    } catch (err: any) {
      message.error("ໂຫຼດຂໍ້ມູນບໍ່ສຳເລັດ");
    } finally {
      this.find_loading.value = false;
      console.log("finally", this.find_loading.value);
    }
  };

  handlePageChange = async (page: number, pageSize?: number) => {
    if (pageSize) {
      this.store.state.pagination.limit = pageSize;
    }
    const query = { ...this.store.query, page, limit: pageSize };
    console.log("page1", this.store.query);
    await this.fetchPage(query);
  };

  showModal = async (record: any, statues?: any) => {
    console.log("update",record);
    Object.assign(this.form_edit, {
      id: record.id,
      apply_courses: record.apply_course.id,
      total_score: record.total_score,
      is_certified: record.is_certified,
      status: record.status,
      completion_date: parseDate(record.completion_date),
      certificate_issued_date: parseDate(record.certificate_issued_date),
      total_study_hours: record.total_study_hours,
    });

    if (!statues) {
      this.open_edit.value = true;
    }
  };

  udpate = async (skipValidation?: boolean) => {
    try {
      if (!skipValidation) {
        const formRef = this.formRef.value;
        if (!formRef) return;
        const isValid = await formRef.validate();
        if (!isValid) return;
      }
      this.update_loading.value = true;

      const payload = {
        ...this.form_edit,
      };
      console.log(payload);
      await this._updateUseCase.execute(payload);
      message.success("ອັບເດດສຳເລັດ");

      await this.fetchPage(this.store.query);
      this.resetForm();

      this.open_edit.value = false;
    } catch (e: any) {
      const error = e as AxiosError;
      const err = error.response?.data as IErrorResponse;
      if (
        err.statusCode === 400 &&
        err.message === "User with this email already exists"
      ) {
        message.error("ມີອີເມວນີ້ໃນລະບົບແລ້ວ");
      } else {
        message.error(err.message);
      }
    } finally {
      this.update_loading.value = false;
    }
  };

  create = async () => {
    try {
      this.creat_loading.value = true;
      const formRef = this.formRef.value;
      console.log(formRef);
      if (!formRef) return;

      const isValid = await formRef.validate();
      if (!isValid) return;

      await this._createUseCase.execute(this.form_create);
      message.success("ສ້າງສຳເລັດ");
      this.resetForm();
      this.fetchPage(this.store.query);
      this.open_create.value = false;
    } catch (e: any) {
      const error = e as AxiosError;
      const err = error.response?.data as IErrorResponse;
      if (
        err.statusCode === 400 &&
        err.message === "User with this email already exists"
      ) {
        message.error("ມີອີເມວນີ້ໃນລະບົບແລ້ວ");
      } else {
        message.error(err.message);
      }
      console.log(e);
    } finally {
      this.creat_loading.value = false;
    }
  };

  openDeleteModal = async (id: number) => {
    this.open_delete.value = true;
    this.delete_id.value = id;
  };

  confirmDelete = async () => {
    try {
      this.isDeleting.value = true;
      await this._deleteUseCase.execute(
        this.delete_id.value,
        this.deleteType.softdelete
      );
      message.success("ລົບລູກຄ້າສຳເລັດ");
      this.fetchPage(this.store.query);
      this.resetForm();
    } catch (err) {
      message.error("ລົບລູກຄ້າບໍ່ສຳເລັດ");
    } finally {
      this.open_delete.value = false;
      this.isDeleting.value = false;
    }
  };

  cancelDelete = async () => {
    this.open_delete.value = false;

    message.info("ຍົກເລີກການລົບ");
  };

  toggleSoftDelete = () => {
    this.isHardDelete.value = false;
    this.deleteType.softdelete = this.isHardDelete.value
      ? DeleteType.HARD
      : DeleteType.SOFT;
  };

  toggleHardDelete = () => {
    this.isHardDelete.value = true;
    this.deleteType.softdelete = this.isHardDelete.value
      ? DeleteType.HARD
      : DeleteType.SOFT;
  };

  confirm_restore = async (id: number) => {
    try {
      this.isDeleting.value = true;
      await this._restoreUseCase.execute(id);
      message.success("ກຼ້ຄືນສຳເລັດ");
      this.fetchPage(this.store.query);
      this.resetForm();
    } catch (err) {
      message.error("ເກີດຂໍ້ຜິດພາດ");
    } finally {
      this.isDeleting.value = false;
    }
  };
  cancel_restore = async () => {};

  // toggleStatus = async (checked: boolean, record: any) => {
  //   const newStatus = checked ? CourseStatus.OPEN : CourseStatus.CLOSED;

  //   await this.showModal(record, newStatus);
  //   this.udpate(true);
  // };
}
