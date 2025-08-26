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
import { useRoleStore } from "../../role/stores/use-role.store";
import { CourseCreateUseCase } from "../usecases/command/create.use-case";
import { CourseFindAllUseCase } from "../usecases/query/get-all.use-case";
import { CourseUpdateUseCase } from "../usecases/command/update.use-case";
import { CourseDeleteUseCase } from "../usecases/command/delete.use-case";
import { CourseRestoreUseCase } from "../usecases/command/restore.use-case";
import {
  CourseStatus,
  type CreateCourseModel,
  type UpdateCourseModel,
} from "../domain/models/course.model";
import { useCourseStore } from "../stores/use-Course.store";
import dayjs from "dayjs";
import { parseDate } from "@utils/format.date";

@injectable()
export default class CourseFormService {
  t = useI18n().t;
  store = useCourseStore();
  roleStore = useRoleStore();

  open_edit = ref<boolean>(false);
  open_create = ref<boolean>(false);
  open_delete = ref<boolean>(false);

  find_loading = ref<boolean>(false);
  create_loading = ref<boolean>(false);
  update_loading = ref<boolean>(false);
  update_loading_status = ref<Record<number, boolean>>({});
  isDeleting = ref<boolean>(false);

  rules: Record<string, Rule[]>;
  formRef = ref<FormInstance | null>(null);

  editFormRef = ref<FormInstance | null>(null);
  creat_loading = ref<boolean>(false);
  columns: any[];

  isHardDelete = ref<boolean>(false);

  delete_id = ref<number>(0);

  constructor(
    private readonly _FindAllUseCase = container.resolve(CourseFindAllUseCase),

    private readonly _createUseCase = container.resolve(CourseCreateUseCase),
    private readonly _updateUseCase = container.resolve(CourseUpdateUseCase),
    private readonly _deleteUseCase = container.resolve(CourseDeleteUseCase),
    private readonly _restoreUseCase = container.resolve(CourseRestoreUseCase)
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
      start_date: [
        { required: true, message: t("validation.required_education") },
        {
          validator: (_, value) => {
            if (!value || !this.form_create.end_date) return Promise.resolve();
            return dayjs(value).isBefore(this.form_create.end_date)
              ? Promise.resolve()
              : Promise.reject(
                  new Error(t("validation.start_must_before_end"))
                );
          },
        },
      ],
      end_date: [
        { required: true, message: t("validation.required_education") },
        {
          validator: (_, value) => {
            if (!value || !this.form_create.start_date)
              return Promise.resolve();
            return dayjs(value).isAfter(this.form_create.start_date)
              ? Promise.resolve()
              : Promise.reject(new Error(t("validation.end_must_after_start")));
          },
        },
      ],
      registration_start_date: [
        { required: true, message: t("validation.required_education") },
        {
          validator: (_, value) => {
            if (!value || !this.form_create.registration_end_date)
              return Promise.resolve();
            return dayjs(value).isBefore(this.form_create.registration_end_date)
              ? Promise.resolve()
              : Promise.reject(
                  new Error(t("validation.start_must_before_end"))
                );
          },
        },
      ],
      registration_end_date: [
        { required: true, message: t("validation.required_education") },
        {
          validator: (_, value) => {
            if (!value || !this.form_create.registration_start_date)
              return Promise.resolve();
            return dayjs(value).isAfter(
              this.form_create.registration_start_date
            )
              ? Promise.resolve()
              : Promise.reject(new Error(t("validation.end_must_after_start")));
          },
        },
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
        title: this.t("course.index"),
        key: "index",
        fixed: "left",
        width: 70,
      },
      {
        title: this.t("course.title"),
        dataIndex: "title",
        key: "title",
        fixed: "left",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("course.teacher"),
        dataIndex: ["teacher", "name"],
        key: "teacher",
        fixed: "left",
        width: 150,
        ellipsis: true,
      },

      {
        title: this.t("course.max_student"),
        dataIndex: "max_student",
        key: "max_student",
        width: 100,
        ellipsis: true,
      },
      {
        title: this.t("course.duration_hours"),
        dataIndex: "duration_hours",
        key: "duration_hours",
        width: 100,
        ellipsis: true,
      },
      {
        title: this.t("course.price"),
        dataIndex: "price",
        key: "price",
        width: 130,
        ellipsis: true,
      },
      {
        title: this.t("course.registration_start"),
        dataIndex: "registration_start_date",
        key: "registration_start_date",
        width: 150,
        ellipsis: true,
      },

      {
        title: this.t("course.registration_end"),
        dataIndex: "registration_end_date",
        key: "registration_end_date",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("course.start_date"),
        dataIndex: "start_date",
        key: "start_date",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("course.end_date"),
        dataIndex: "end_date",
        key: "end_date",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("course.description"),
        dataIndex: "description",
        key: "description",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("course.status"),
        dataIndex: "status",
        key: "status",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("common.createdAt"),
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("common.updatedAt"),
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("common.action"),
        key: "action",
        fixed: "right",
        width: 170,
      },
    ];
  }

  deleteType = reactive({ softdelete: DeleteType.SOFT });

  form_create = reactive<CreateCourseModel>({
    teacher: null,
    category: null,
    title: "",
    price: null,
    max_student: null,
    start_date: "",
    end_date: "",
    registration_start_date: "",
    registration_end_date: "",
    description: "",
    status:CourseStatus.CLOSED,
    duration_hours: null,
  });

  form_edit = reactive<UpdateCourseModel>({
    teacher: 0,
    category: 0,
    title: "",
    price: 0,
    max_student: 0,
    start_date: "",
    end_date: "",
    registration_start_date: "",
    registration_end_date: "",
    description: "",
    status: CourseStatus.OPEN,
    duration_hours: 0,
    id: 0,
  });

  resetForm = () => {
    this.form_create.teacher = 0;
    this.form_create.category = 0;
    this.form_create.title = "";
    this.form_create.price = 0;
    this.form_create.max_student = 0;
    this.form_create.start_date = "";
    this.form_create.end_date = "";
    this.form_create.registration_start_date = "";
    this.form_create.registration_end_date = "";
    this.form_create.description = "";
    this.form_create.status = CourseStatus.OPEN;
    this.form_create.duration_hours = 0;
    this.form_edit.id = 0;
    this.form_edit.teacher = 0;
    this.form_edit.category = 0;
    this.form_edit.title = "";
    this.form_edit.price = 0;
    this.form_edit.max_student = 0;
    this.form_edit.start_date = "";
    this.form_edit.end_date = "";
    this.form_edit.registration_start_date = "";

    this.form_edit.registration_end_date = "";
    this.form_edit.description = "";

    this.form_edit.status = CourseStatus.OPEN;
    this.form_edit.duration_hours = 0;

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
      teacher: record.teacher.id,
      category: record.category.id,
      title: record.title,
      price: record.price,
      max_student: record.max_student,
      start_date: parseDate(record.start_date),
      end_date: parseDate(record.end_date),
      registration_start_date: parseDate(record.registration_start_date),
      registration_end_date: parseDate(record.registration_end_date),
      description: record.description,
      status: statues ? statues : record.status,
      duration_hours: record.duration_hours,
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
      this.form_create.status = CourseStatus.CLOSED;
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

  toggleStatus = async (checked: boolean, record: any) => {
    this.update_loading_status.value[record.id] = true;
    const newStatus = checked ? CourseStatus.OPEN : CourseStatus.CLOSED;
    try{
    await this.showModal(record, newStatus);
    this.udpate(true);
    }
     finally {
      this.update_loading_status.value[record.id] = false;
    }
  };
}
