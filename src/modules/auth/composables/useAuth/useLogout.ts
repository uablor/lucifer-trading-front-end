import { reactive, ref } from "vue";
import type { AuthLoginPayload } from "../../domain/models/AuthPayload";
import { notification } from "ant-design-vue";
import type { AxiosError } from "axios";
import { useRouter } from "vue-router";
import type { IErrorResponse } from "@/domain/models/IErrorResponse.interface";
// import { useAuthStore } from "../../stores/authStore";

export function useLogout() {
  const form = reactive<AuthLoginPayload>({ email: "", password: "" });
  const router = useRouter();
  const isLogoutModalVisible = ref<boolean>(false);
  const loding_logout = ref<boolean>(false);

  
const showLogoutModal = () => {
  isLogoutModalVisible.value = true;
};

const handleCancel = () => {
  isLogoutModalVisible.value = false;
};
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
    loding_logout.value = true;
    try {
    //   const res = await authStore.logout();
    //   if (res.status === 201) {
    //     await performLogout();
    //     openNotificationWithIcon("success", "Success", "Logout successful");
    //     router.push({ name: "auth.login" });
    //   } else {
    //     openNotificationWithIcon("error", "Error", "Login failed");
    //   }

        await performLogout();
        openNotificationWithIcon("success", "Success", "Logout successful");
        router.push({ name: "auth.login" });
      
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
      loding_logout.value = false;
    }
  };

  const onFinishFailed = () => {
  };

  
const performLogout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('auth');
  
  sessionStorage.clear();
  
  await new Promise(resolve => setTimeout(resolve, 1000));
};

  return { form, onFinish, onFinishFailed,isLogoutModalVisible, loding_logout, showLogoutModal, handleCancel };
}
