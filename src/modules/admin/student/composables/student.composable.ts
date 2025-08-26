import { ref, reactive } from "vue";
import { injectable } from "tsyringe";
import { message } from "ant-design-vue";
import { useCustomerStore } from "../stores/student.store";
import type { FormInstance } from "ant-design-vue";
import { useI18n } from "vue-i18n";

import type { Rule } from "ant-design-vue/es/form";

import { container } from "tsyringe";
import { StudentFindAllUseCase } from "../usecases/query/get-all.use-case";
import { type IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { CreateStudentModel } from "../domain/models/student.model";
import dayjs from "dayjs";
import { DeleteType } from "@/shared/enums/deletetype.enum";
import { ProvinceFindAllUseCase } from "../usecases/query/get-all-province.use-case";
import type { address } from "@/domain/models/address.entity";
import { DistrictFindUseCase } from "../usecases/query/find.district.use-case";
import { StudentCreateUseCase } from "../usecases/command/create-student.use.case";
import type { UpdateStudentModel } from "../domain/models/student.model";
import { StudentUpdateUseCase } from "../usecases/command/update-student.use.case";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "@/domain/models/IErrorResponse.interface";
import { StudentDeleteUseCase } from "../usecases/command/delete-student.use-case";
import { RestoreStudentUseCase } from "../usecases/command/restore-student.use-case";
import router from "@/router";
// import { StudentFindOneUseCase } from "../usecases/query/find-one.use-case";

@injectable()
export default class StudentFormService {
  t = useI18n().t;
  store = useCustomerStore();

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
    private readonly _studentFindAllUseCase = container.resolve(
      StudentFindAllUseCase
    ),
    private readonly _provinceFindAllUseCase = container.resolve(
      ProvinceFindAllUseCase
    ),
    private readonly _districtFindAllUseCase = container.resolve(
      DistrictFindUseCase
    ),

    private readonly _createStudentUseCase = container.resolve(
      StudentCreateUseCase
    ),
    private readonly _updateStudentUseCase = container.resolve(
      StudentUpdateUseCase
    ),
    private readonly _deleteStudentUseCase = container.resolve(
      StudentDeleteUseCase
    ),
    private readonly _restoreStudentUseCase = container.resolve(
      RestoreStudentUseCase
    ),
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
      birth_date: [
        { required: true, message: t("validation.required_birth_date") },
      ],
      gender: [{ required: true, message: t("validation.required_gender") }],
    };

    this.columns = [
      {
        title: this.t("ລາຍລະອຽດ"),
        key: "detial",
        fixed: "left",
        width: 100,
      },
      {
        title: this.t("table.index"),
        key: "index",
        fixed: "left",
        width: 70,
      },
      // {
      //   title: this.t("table.id"),
      //   dataIndex: "id",
      //   key: "id",
      //   fixed: "left",
      //   width: 60,
      // },
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
        title: this.t("table.birth_date"),
        dataIndex: "birth_date",
        key: "birth_date",
        width: 130,
        ellipsis: true,
      },
      {
        title: this.t("table.gender"),
        dataIndex: "gender",
        key: "gender",
        width: 100,
        ellipsis: true,
      },
      {
        title: this.t("common.district"),
        dataIndex: "district",
        key: "district",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("common.province"),
        dataIndex: "province",
        key: "province",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("common.createdAt"),
        dataIndex: "createdAt",
        key: "createdAt",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("common.updatedAt"),
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: 160,
        ellipsis: true,
      },
      {
        title: this.t("common.action"),
        key: "action",
        fixed: "right",
        width: 190,
      },
    ];
  }

  deleteType = reactive({ softdelete: DeleteType.SOFT });

  form_create = reactive<CreateStudentModel>({
    name: "",
    surname: "",
    gender: "",
    password: "",
    birth_date: null,
    email: "",
    district: 0,
  });

  form_edit = reactive<UpdateStudentModel>({
    id: 0,
    name: "",
    surname: "",
    gender: "",
    birth_date: null,
    district_id: null,
    email: "",
  });

  address_id = reactive<address>({
    district_id: null,
    province_id: null,
    district: null,
    province: null,
    district_en: null,
    province_en: null,
  });

  resetForm = () => {
    this.form_create.name = "";
    this.form_create.surname = "";
    this.form_create.gender = "";
    this.form_create.password = "";
    this.form_create.birth_date = null;
    this.form_create.email = "";
    this.form_create.district = 0;

    this.form_edit.id = 0;
    this.form_edit.name = "";
    this.form_edit.surname = "";
    this.form_edit.gender = "";
    this.form_edit.birth_date = null;
    this.form_edit.district_id = null;
    this.form_edit.email = "";

    this.delete_id.value = 0;
  };

  resetAddress = () => {
    this.address_id.district_id = null;
    this.address_id.province_id = null;
    this.address_id.district = null;
    this.address_id.province = null;
  };

  fetchPage = async (query: IPaginationQuery) => {
    try {
      this.find_loading.value = true;
      const response = await this._studentFindAllUseCase.execute(query);
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
      gender: record.gender,
      birth_date: record.birth_date === null ? undefined : dayjs(record.birth_date, "DD-MM-YYYY"),
      email: record.email,
      district_id: record.district_id,
    });
    this.address_id.district_id = record.district_id;
    this.address_id.province_id = record.province_id;
    this.address_id.district = record.district;
    this.address_id.province = record.province;
    console.log("this.address_id,", this.address_id);
    console.log(this.form_edit);
    this.open_edit.value = true;
    console.log(this.open_edit.value);
  };

  udpate = async () => {
    try {
      this.update_loading.value = true;
      const formRef = this.formRef.value;
      console.log("asdfasdf", this.form_edit);
      if (!formRef) return;
      const isValid = await formRef.validate();
      if (!isValid) return;

      const payload = {
        ...this.form_edit,
        district_id: this.address_id.district_id,
      };
      await this._updateStudentUseCase.execute(payload);
      message.success("ອັບເດດສຳເລັດ");
      this.resetForm();
      this.open_edit.value = false;

      await this.fetchPage(this.store.query);
      this.resetAddress();
    } catch (e:any) {
      const error = e as AxiosError;
      const err = error.response?.data as IErrorResponse;
      if (err.statusCode === 400 && err.message === "User with this email already exists") {
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
      this.form_create.district = this.address_id.district_id as number;
      const formRef = this.formRef.value;
      if (!formRef) return;

      const isValid = await formRef.validate();
      if (!isValid) return;

      await this._createStudentUseCase.execute(this.form_create);
      message.success("ສ້າງສຳເລັດ");
      this.resetForm();
      this.fetchPage(this.store.query);
      this.resetAddress();
      this.open_create.value = false;
    } catch (e: any) {
      const error = e as AxiosError;
      const err = error.response?.data as IErrorResponse;
      if (err.statusCode === 400 && err.message === "User already exists") {
        message.error("ມີຜູ້ໃຊ້ນີ້ໃນລະບົບແລ້ວ");
      } else {
        message.error(err.message);
      }
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
      await this._deleteStudentUseCase.execute(this.delete_id.value, this.deleteType.softdelete);
      message.success("ລົບລູກຄ້າສຳເລັດ");
      this.fetchPage(this.store.query);
      this.resetForm();

    } catch (err) {
      message.error("ລົບລູກຄ້າບໍ່ສຳເລັດ");
    }finally {
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

  fetchDistricts = async () => {
    try {
      this.address_id.district_id = null;
      const res = await this._districtFindAllUseCase.execute(
        this.address_id.province_id ?? 0
      );
      this.store.address.district = res;
    } catch (err: any) {
      message.error("ໂຫຼດຂໍ້ມູນບໍ່ສຳເລັດ");
    }
  };

  findallProvince = async () => {
    try {
      this.find_loading.value = true;
      const response = await this._provinceFindAllUseCase.execute();
      this.store.address.province = response;
    } catch (err: any) {
    } finally {
      this.find_loading.value = false;
    }
  };

  confirm_restore = async (id : number) => {
    try {
    this.isDeleting.value = true;
    await this._restoreStudentUseCase.execute(id);
    message.success("ກຼ້ຄືນສຳເລັດ");
    this.fetchPage(this.store.query);
    this.resetForm();
    } catch (err) {
      message.error("ເກີດຂໍ້ຜິດພາດ");
    }finally {
      this.isDeleting.value = false;
    }
  }
  cancel_restore = async () => {
  }

  viewStudent = (id : number) =>{
    console.log(id);
    router.push({
      name : 'admin.student.profile',
      query: {
    id: id
    }
    })
  }


}
