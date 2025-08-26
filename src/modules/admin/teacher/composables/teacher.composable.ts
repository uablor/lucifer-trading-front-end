import { ref, reactive } from "vue";
import { injectable } from "tsyringe";
import { message } from "ant-design-vue";
import { useTeacherStore } from "../stores/use-teacher.store";
import type { FormInstance } from "ant-design-vue";
import { useI18n } from "vue-i18n";

import type { Rule } from "ant-design-vue/es/form";

import { container } from "tsyringe";
import { type IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import { DeleteType } from "@/shared/enums/deletetype.enum";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "@/domain/models/IErrorResponse.interface";
import { TeacherFindAllUseCase } from "../usecases/query/get-all.use-case";
import type {
  CreateTeacherModel,
  UpdateTeacherModel,
} from "../domain/models/teacher.model";
import { TeacherCreateUseCase } from "../usecases/command/create-teacher.use-case";
import { TeacherDeleteUseCase } from "../usecases/command/delete.teacher.use-case";
import { TeacherRestoreUseCase } from "../usecases/command/restore-teacher.use-case";
import { TeacherUpdateUseCase } from "../usecases/command/update-teacher.use-case";
// import { StudentDeleteUseCase } from "../usecases/command/delete-student.use-case";
// import { RestoreStudentUseCase } from "../usecases/command/restore-student.use-case";

@injectable()
export default class TeacherFormService {
  t = useI18n().t;
  store = useTeacherStore();

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
    private readonly _teacherFindAllUseCase = container.resolve(
      TeacherFindAllUseCase
    ),

    private readonly _createTeacherUseCase = container.resolve(
      TeacherCreateUseCase
    ),
    private readonly _updateStudentUseCase = container.resolve(
      TeacherUpdateUseCase
    ),
    private readonly _deleteUseCase = container.resolve(TeacherDeleteUseCase),
    private readonly _restoreStudentUseCase = container.resolve(
      TeacherRestoreUseCase
    )
  ) {
    const { t } = useI18n();

    this.rules = {
      name: [{ required: true, message: t("validation.required_name") }],
      surname: [{ required: true, message: t("validation.required_surname") }],
      email: [
        { required: true, message: t("validation.required_email") },
        { type: "email", message: t("validation.valid_email") },
      ],
      password: [
        { required: true, message: t("validation.required_password") },
        { min: 6, message: t("validation.password_min") },
      ],
      experience: [
        { required: true, message: t("validation.required_specialization") },
      ],
      specialization: [
        { required: true, message: t("validation.required_experience") },
      ],
      education: [
        { required: true, message: t("validation.required_education") },
      ],
    };

    this.columns = [
      {
        title: this.t("table.index"),
        key: "idex",
        fixed: "left",
        width: 70,
      },
      {
        title: this.t("table.id"),
        dataIndex: "id",
        key: "id",
        fixed: "left",
        width: 60,
      },
      {
        title: this.t("table.name"),
        dataIndex: "name",
        key: "name",
        fixed: "left",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("table.surname"),
        dataIndex: "surname",
        key: "surname",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("table.email"),
        dataIndex: "email",
        key: "email",
        width: 200,
        ellipsis: true,
      },
      {
        title: this.t("table.specialization"),
        dataIndex: "specialization",
        key: "specialization",
        width: 130,
        ellipsis: true,
      },
      {
        title: this.t("table.experience"),
        dataIndex: "experience",
        key: "experience",
        width: 100,
        ellipsis: true,
      },
      {
        title: this.t("table.education"),
        dataIndex: "education",
        key: "education",
        width: 150,
        ellipsis: true,
      },

      {
        title: this.t("table.createdAt"),
        dataIndex: "createdAt",
        key: "createdAt",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("table.updatedAt"),
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 160,
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

  form_create = reactive<CreateTeacherModel>({
    name: "",
    surname: "",
    password: "",
    email: "",
    specialization: "",
    experience: 0,
    education: "",
  });

  form_edit = reactive<UpdateTeacherModel>({
    id: 0,
    name: "",
    surname: "",
    specialization: "",
    experience: 0 ,
    education: "",
  });

  resetForm = () => {
    this.form_create.name = "";
    this.form_create.surname = "";
    this.form_create.password = "";
    this.form_create.specialization = "";
    this.form_create.experience = 0;
    this.form_create.education = "";
    this.form_create.email = "";

    this.form_edit.id = 0;
    this.form_edit.name = "";
    this.form_edit.surname = "";
    this.form_edit.specialization = "";
    this.form_edit.experience = 0;
    this.form_edit.education = "";

    this.delete_id.value = 0;
  };

  fetchPage = async (query: IPaginationQuery) => {
    try {
      this.find_loading.value = true;
      const response = await this._teacherFindAllUseCase.execute(query);
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

  showModal = async (record: any) => {
    // this.open_create.value = true;
    console.log("this.form_edit", record);

    Object.assign(this.form_edit, {
      id: record.id,
      name: record.name,
      surname: record.surname,
      specialization: record.specialization,
      experience: record.experience,
      education: record.education,
    });
    this.open_edit.value = true;
  };

  udpate = async () => {
    try {
      this.update_loading.value = true;
      const formRef = this.formRef.value;

      if (!formRef) return;
      const isValid = await formRef.validate();
      if (!isValid) return;

      const payload = {
        ...this.form_edit,
      };
      console.log(payload);
      await this._updateStudentUseCase.execute(payload);
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

      await this._createTeacherUseCase.execute(this.form_create);
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
      await this._restoreStudentUseCase.execute(id);
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

  experienceToSubmit = this.form_create.experience ?? 0;

  originalExperience = ref(0);
  onExperienceFocus = () => {
    if (this.form_create.experience === 0) {
      this.form_create.experience = null;
    }
  };

  onExperienceBlur = () => {
    if (
      this.form_create.experience === null
    ) {
      this.form_create.experience = this.originalExperience.value;
    }
  };
}
