import { reactive, ref } from "vue";
import type { AuthLoginPayload } from "../../domain/models/AuthPayload";
import { useAuthStore } from "../../stores/authStore";
import { notification } from "ant-design-vue";
import type { AxiosError } from "axios";
import { useRouter } from "vue-router";
import type { IErrorResponse } from "@/domain/models/IErrorResponse.interface";

export function useLoginForm() {
  const form = reactive<AuthLoginPayload>({ email: "", password: "" });
  const loading = ref(false);
  const authStore = useAuthStore();
  const router = useRouter();

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

  const onFinish = async () => {
    loading.value = true;
    try {
      const res = await authStore.login(form);
      console.log(res.status);
      console.log(res);
      console.log(res.data);
      if (res.status === 201) {
        openNotificationWithIcon("success", "Success", "Login successful");
        localStorage.setItem("token", res.data.accessToken);
        router.push({ name: "admin.student" });
      } else {
        openNotificationWithIcon("error", "Error", "Login failed");
      }
    } catch (e: any) {
      const error = e as AxiosError;
      const err = error.response?.data as IErrorResponse;

      if (
        err.statusCode === 401 ||
        err.message === "Invalid email or password"
      ) {
        openNotificationWithIcon("error", "Error", "Invalid email or password");
      } else if (
        err.statusCode === 400 &&
        err.message === "User is not verified"
      ) {
        openNotificationWithIcon("error", "Error", "User is not verified");
      } else {
        openNotificationWithIcon("error", "Error", e.message);
      }
    } finally {
      loading.value = false;
    }
  };

  const onFinishFailed = () => {
    // error.value = "Login failed. Please check your credentials.";
  };

  return { form, onFinish, loading, onFinishFailed };
}
