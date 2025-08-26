import { ref, reactive } from "vue";
import { injectable } from "tsyringe";
import { message } from "ant-design-vue";
import { useStudentEducationStore } from "../stores/use-student-education.store";
import type { FormInstance } from "ant-design-vue";
import { useI18n } from "vue-i18n";

import type { Rule } from "ant-design-vue/es/form";

import { container } from "tsyringe";
import { type IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import { DeleteType } from "@/shared/enums/deletetype.enum";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "@/domain/models/IErrorResponse.interface";
import { FindAllUseCase } from "../usecases/query/get-all.use-case";

import { CreateUseCase } from "../usecases/command/create-student-education.use-case";
import { DeleteUseCase } from "../usecases/command/delete-student-education.use-case";
import { RestoreUseCase } from "../usecases/command/restore-student-education.use-case";
import { UpdateUseCase } from "../usecases/command/update-student-education.use-case";
import {
  educationStatus,
  type CreateStudentEducationModel,
  type UpdateStudentEducationModel,
} from "../domain/models/education.model";
import { StudentFindOneUseCase } from "../../student/usecases/query/find-one.use-case";

@injectable()
export default class StudentEducationFormService {
  t = useI18n().t;
  store = useStudentEducationStore();

  open_edit = ref<boolean>(false);
  open_create = ref<boolean>(false);
  open_delete = ref<boolean>(false);

  find_loading = ref<boolean>(false);
  create_loading = ref<boolean>(false);
  update_loading = ref<boolean>(false);
  isDeleting = ref<boolean>(false);
  isLoding_findone = ref<boolean>(false);
  error_findone = ref<boolean>(false);

  rules: Record<string, Rule[]>;
  formRef = ref<FormInstance | null>(null);

  editFormRef = ref<FormInstance | null>(null);
  creat_loading = ref<boolean>(false);
  columns: any[];

  isHardDelete = ref<boolean>(false);

  delete_id = ref<number>(0);

  constructor(
    private readonly _FindAllUseCase = container.resolve(FindAllUseCase),

    private readonly _createUseCase = container.resolve(CreateUseCase),
    private readonly _updateUseCase = container.resolve(UpdateUseCase),
    private readonly _deleteUseCase = container.resolve(DeleteUseCase),
    private readonly _restoreUseCase = container.resolve(RestoreUseCase),
    private readonly _findOneStudentUseCase = container.resolve(StudentFindOneUseCase)
  ) {
    const { t } = useI18n();

    this.rules = {
      level: [{ required: true, message: t("validation.required_name") }],
      field_of_study: [
        { required: true, message: t("validation.required_surname") },
      ],
      current_occupation: [
        { required: true, message: t("validation.required_password") },
      ],
      work_experience: [
        { required: true, message: t("validation.required_specialization") },
      ],
      status: [{ required: true, message: t("validation.required_education") }],
    };

    this.columns = [
        {
    title: 'ລຳດັບ',
    key: 'index',
    width: 60,
    align: 'center',
    fixed: 'left'
  },
      {
        title: this.t("table.level"),
        dataIndex: "level",
        key: "level",
        fixed: "left",
        width: 150,
      },
      {
        title: this.t("table.current_occupation"),
        dataIndex: "current_occupation",
        key: "current_occupation",
        fixed: "left",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("table.work_experience"),
        dataIndex: "work_experience",
        key: "work_experience",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("table.status"),
        dataIndex: "status",
        key: "status",
        width: 130,
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
    title: 'Actions',
    key: 'action',
    width: 170,
    align: 'center',
    fixed: 'right'
  }
    ];
  }

  deleteType = reactive({ softdelete: DeleteType.SOFT });

  form_create = reactive<CreateStudentEducationModel>({
    level: "",
    field_of_study: "",
    current_occupation: "",
    work_experience: 0,
    student_id: 0,
    status: educationStatus.studying,
  });

  form_edit = reactive<UpdateStudentEducationModel>({
    id: 0,
    level: "",
    field_of_study: "",
    current_occupation: "",
    work_experience: 0,
    student_id: 0,
    status: educationStatus.studying,
  });

  resetForm = () => {
    this.form_create.level = "";
    this.form_create.field_of_study = "";
    this.form_create.current_occupation = "";
    this.form_create.work_experience = 0;
    this.form_create.student_id = 0;
    this.form_create.status = educationStatus.studying;

    this.form_edit.id = 0;
    this.form_edit.level = "";
    this.form_edit.field_of_study = "";
    this.form_edit.current_occupation = "";
    this.form_edit.work_experience = 0;
    this.form_edit.student_id = 0;
    this.form_edit.status = educationStatus.studying;

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

  showModal = async (record: any) => {
    Object.assign(this.form_edit, {
      id: record.id,
      level: record.level,  
      field_of_study: record.field_of_study,
      current_occupation: record.current_occupation,
      work_experience: record.work_experience,
      student_id: record.student_id,
      status: record.status,
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
      await this._updateUseCase.execute(payload);
      message.success("ອັບເດດສຳເລັດ");

      await this.findOneStudent(this.store.student.data.id);
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

      this.form_create.student_id = this.store.student.data?.id ?? 0;
      console.log("sdfsdfsdf",this.store.student.data);
      console.log(this.form_create);
      if (this.form_create.student_id === 0 || this.form_create.student_id === null) {
       return message.error('error');
      }

      await this._createUseCase.execute(this.form_create);
      
      message.success("ສ້າງສຳເລັດ");
      this.resetForm();
      this.findOneStudent(this.store.student.data.id);
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
      await this.findOneStudent(this.store.student.data.id);
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
      this.findOneStudent(this.store.student.data.id);
      this.resetForm();
    } catch (err) {
      message.error("ເກີດຂໍ້ຜິດພາດ");
    } finally {
      this.isDeleting.value = false;
    }
  };
  cancel_restore = async () => {};

  findOneStudent = async (id: number) => {
    try {
      this.isLoding_findone.value = true;
      const res = await this._findOneStudentUseCase.execute(id);
      this.store.student.data = res;

      message.success("ໂຫຼດຂໍ້ມູນສຳເລັດ");
    } catch (err) {
      message.error("ໂຫຼດຂໍ້ມູນບໍ່ສຳເລັດ");
    } finally {
      this.isLoding_findone.value = false;
    }
  };
}
