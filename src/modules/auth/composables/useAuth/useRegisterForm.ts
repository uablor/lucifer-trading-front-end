import { reactive, ref } from "vue";
import type { AuthRegisterPayload } from "../../domain/models/AuthPayload";
import { useAuthStore } from "../../stores/authStore";
import type { Rule } from "ant-design-vue/es/form";
import { useI18n } from "vue-i18n";
import { notification } from "ant-design-vue";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "@/domain/models/IErrorResponse.interface";
export function useRegisterForm() {
  const { t } = useI18n();
  const loading = ref(false);
  const authStore = useAuthStore();

 const form = reactive<AuthRegisterPayload>({
    email: "",
    password: "",
    username: "",
    confirm: false,
    password2: "",
  });

    const openNotificationWithIcon = (
    type: string,
    message?: string,
    description?: string
  ) => {
    (notification as any)[type]({
      message: message,
      description: description,
    });
  };


  const resetForm = () => {
    form.email = "";
    form.password = "";
    form.username = "";
    form.confirm = false;
    form.password2 = "";
  };

  const onFinish = async () => {
    loading.value = true;
    console.log(form);
    try {
      const res = await authStore.register(form);
      if (res.status === 201) {
        openNotificationWithIcon("success", "Success", "Registration successful");
        resetForm();
      } else {
        openNotificationWithIcon("error", "Error", "Registration failed");
      }

    } catch (e: any) {
      const error = e as AxiosError;
      const err = error.response?.data as IErrorResponse;
      if (
        error.status === 400 &&
        err.message === "User with this email already exists"
      ) {
        openNotificationWithIcon("error", "Error", "User with this email already exists");
      } else {
        openNotificationWithIcon("error", "Error", e.message);
      }
      
    } finally {
      loading.value = false;
    }
  };

  const onFinishFailed = () => {
  };

  const validateConfirmPassword: Rule["validator"] = async (_rule, value) => {
    if (!value) {
      return Promise.reject(t("register.error"));
    }
    if (value !== form.password) {
      return Promise.reject(t("register.passwordMismatch"));
    }
    return Promise.resolve();
  };

  return {validateConfirmPassword, form, onFinish, loading, onFinishFailed };
}
