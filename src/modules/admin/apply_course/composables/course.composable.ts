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
import { useApplyCourseStore } from "../stores/use-Apply-course.store";
import { ApplyCourseFindAllUseCase } from "../usecases/query/get-all.use-case";
import { ApplyCourseCreateUseCase } from "../usecases/command/create.use-case";
import { ApplyCourseUpdateUseCase } from "../usecases/command/update.use-case";
import { ApplyCourseDeleteUseCase } from "../usecases/command/delete.use-case";
import { ApplyCourseRestoreUseCase } from "../usecases/command/restore.use-case";
import { ApplyCourseStatus, type CreateApplyCourseModel, type UpdateApplyCourseModel } from "../domain/models/apply_course.model";

@injectable()
export default class StudentFormService {
  t = useI18n().t;
  store = useApplyCourseStore();

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
    private readonly _FindAllUseCase = container.resolve(ApplyCourseFindAllUseCase),

    private readonly _createUseCase = container.resolve(ApplyCourseCreateUseCase),
    private readonly _updateUseCase = container.resolve(ApplyCourseUpdateUseCase),
    private readonly _deleteUseCase = container.resolve(ApplyCourseDeleteUseCase),
    private readonly _restoreUseCase = container.resolve(ApplyCourseRestoreUseCase)
  ) {
    const { t } = useI18n();

    this.rules = {
      student: [{ required: true, message: t("validation.required_name") }],
      course: [{ required: true, message: t("validation.required_surname") }],
      reason: [{ required: true, message: t("validation.required_email") }],
      status: [{ required: true, message: t("validation.required_education") }],
    };

    this.columns = [
      {
        title: this.t("table.index"),
        key: "index",
        fixed: "left",
        width: 50,
      },
      {
        title: this.t("table.student"),
        dataIndex: ["student", "name"],
        key: "student",
        fixed: "left",
        width: 140,
        ellipsis: true,
      },
      {
        title: this.t("table.course"),
        dataIndex: ["course", "title"],
        key: "course",
        fixed: "left",
        width: 130,
        ellipsis: true,
      },
      {
        title: this.t("table.reason"),
        dataIndex: "reason",
        key: "reason",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("table.price"),
        dataIndex: "price",
        key: "price",
        width: 150,
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
        width: 140,
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
        width: 120,
      },
    ];
  }

  deleteType = reactive({ softdelete: DeleteType.SOFT });
  form_create = reactive<CreateApplyCourseModel>({
    student: null,
    course: null,
    status: ApplyCourseStatus.PENDING,
    reason: null,
  });

  form_edit = reactive<UpdateApplyCourseModel>({
    id: 0,
    student: null,
    course: null,
    status: ApplyCourseStatus.PENDING,
    reason: null,
  });

  resetForm = () => {
    this.form_create = {
      student: 0,
      course: 0,
      status: ApplyCourseStatus.PENDING,
      reason: 0,
    };

    this.form_edit = {
      id: 0,
      student: null,
      course: null,
      status: ApplyCourseStatus.PENDING,
      reason: 0,
    };

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
    Object.assign(this.form_edit, {
      id: record.id,
      student: record.student.id,
      course: record.course.id,
      status: record.status,
      reason: record.reason,
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
