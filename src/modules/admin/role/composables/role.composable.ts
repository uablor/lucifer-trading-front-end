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
import { RoleFindAllUseCase } from "../usecases/query/get-all.use-case";
import { useRoleStore } from "../stores/use-role.store";
import { RoleCreateUseCase } from "../usecases/command/create-role.use-case";
import { RoleUpdateUseCase } from "../usecases/command/update-role.use-case";
import { RoleRestoreUseCase } from "../usecases/command/restore-role.use-case";
import { RoleDeleteUseCase } from "../usecases/command/delete.role.use-case";
import type {
  CreateRoleModel,
  UpdateRoleModel,
} from "../domain/models/role.model";
import { PermissionFindAllUseCase } from "../usecases/query/get-all-permission.use-case";
import type { PermissionModel } from "../domain/models/permission.model";

@injectable()
export default class RoleFormService {
  t = useI18n().t;
  store = useRoleStore();

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

  permissions = ref<PermissionModel[]>([]);

  constructor(
    private readonly _roleFindAllUseCase = container.resolve(
      RoleFindAllUseCase
    ),

    private readonly _roleCreateUseCase = container.resolve(RoleCreateUseCase),
    private readonly _roleUpdateUseCase = container.resolve(RoleUpdateUseCase),
    private readonly _deleteUseCase = container.resolve(RoleDeleteUseCase),
    private readonly _restoreUseCase = container.resolve(RoleRestoreUseCase),
    private readonly _getPermissionUseCase = container.resolve(PermissionFindAllUseCase)
  ) {
    const { t } = useI18n();

    this.rules = {
      name: [{ required: true, message: t("validation.required_name") }],
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
        title: this.t("table.display_name"),
        dataIndex: "display_name",
        key: "display_name",
        width: 150,
        ellipsis: true,
      },
      {
        title: this.t("table.permissions"),
        dataIndex: "permissions",
        key: "permissions",
        width: 200,
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
        width: 140,
      },
    ];
  }

  deleteType = reactive({ softdelete: DeleteType.SOFT });

  form_create = reactive<CreateRoleModel>({
    name: "",
    display_name: "",
    permissions: [],
  });

  form_edit = reactive<UpdateRoleModel>({
    id: 0,
    name: "",
    display_name: "",
    permissions: [],
  });

  resetForm = () => {
    this.form_create.name = "";
    this.form_create.display_name = "";
    this.form_create.display_name = "";

    this.form_edit.id = 0;
    this.form_edit.name = "";
    this.form_edit.display_name = "";
    this.form_edit.permissions = [];

    this.delete_id.value = 0;
  };

  fetchPage = async (query: IPaginationQuery) => {
    try {
      this.find_loading.value = true;
      const response = await this._roleFindAllUseCase.execute(query);
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
      display_name: record.display_name,
      permissions: record.permissions.map((r: any) => r.id),
    });
    this.open_edit.value = true;
  };
  // permissionOptions = computed(() => {
  //   return this.store.state.data.permissions.map((p) => ({
  //     label: p.display_name,
  //     value: p.id,
  //   }));
  // });

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
      await this._roleUpdateUseCase.execute(payload);
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
      await this._roleCreateUseCase.execute(this.form_create);
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

  getPermissions = async () => {
    try {
      const res = await this._getPermissionUseCase.execute();
      this.permissions.value = res;
      console.log(this.form_create);
    } catch (err: any) {
      message.error("ໂຫຼດຂໍ້ມູນບໍ່ສຳເລັດ");
      console.log(err);
    }
  };
}
