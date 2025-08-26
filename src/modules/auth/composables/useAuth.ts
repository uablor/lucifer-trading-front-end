// // src/modules/auth/composables/useLoginForm.ts
// import { ref, reactive } from "vue";
// import { useAuthStore } from "../stores/authStore";
// import type {
//   AuthLoginPayload,
//   AuthRegisterPayload,
// } from "../domain/models/AuthPayload";

// export function useLoginForm() {
//   const form = reactive<AuthLoginPayload>({
//     email: "",
//     password: "",
//   });

//   const error = ref<string | null>(null);
//   const loading = ref(false);

//   const authStore = useAuthStore();


//   const onFinish = async () => {
//     loading.value = true;
//     try {
//       const res = await authStore.login(form);

//     } catch (e: any) {
//       error.value = e.message;
//     } finally {
//       loading.value = false;
//     }
//   };

//   const onFinishFailed = (errorInfo: any) => {
//     console.log("Failed:", errorInfo);
//     error.value = "Login failed. Please check your credentials.";
//   };

//   return {
//     form,
//     onFinish,
//     error,
//     loading,
//     onFinishFailed,
//   };
// }

// export function useRegisterForm() {
//   const form = reactive<AuthRegisterPayload>({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const resetForm = () => {
//   form.name = '';
//   form.email = '';
//   form.password = '';
// }
//   const error = ref<string | null>(null);
//   const loading = ref(false);

//   const authStore = useAuthStore();

//   const onFinish = async (_values: any) => {
//     loading.value = true;
//     try {
//       await authStore.login(form);
//     //   if (res.state === "success") {
//     //     resetForm();
//     //     // Handle successful registration, e.g., redirect to login or home page
//     //     console.log("Registration successful");
//     //   }
//     } catch (e: any) {
//       error.value = e.message;
//     } finally {
//       loading.value = false;
//     }
//   };
//   const onFinishFailed = (errorInfo: any) => {
//     console.log("Failed:", errorInfo);
//     error.value = "Registration failed. Please check your credentials.";
//   };
//   return {
//     form,
//     onFinish,
//     error,
//     loading,
//     onFinishFailed,
//   };
// }
