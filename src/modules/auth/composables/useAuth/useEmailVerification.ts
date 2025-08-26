// composables/useEmailVerification.ts
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { VerifyEmailUseCase } from "../../usecases/command/verifyemail.use-case";
import { container } from "tsyringe";
import { ResendEmailUseCase } from "../../usecases/command/resendemail.use-case";
type VerificationStatus = "verifying" | "success" | "error" | "expired";

export function useEmailVerification() {
  const route = useRoute();
  const router = useRouter();

  const status = ref<VerificationStatus>("verifying");
  const errorMessage = ref("");
  const isRequesting = ref(false);
  const isSending = ref(false);
  const showEmailModal = ref(false);
  const emailForResend = ref("");

  const verifyEmail = async (token: string) => {
    try {
      const _verifyEmailuseCase = await container.resolve(VerifyEmailUseCase);
      status.value = "verifying";
      await _verifyEmailuseCase.execute(token);

      status.value = "success";
      message.success("ຢືນຢັນອີເມວສຳເລັດ!");
    } catch (error: any) {
      console.error("Verification error:", error);
      if (
        error.message.includes("expired") ||
        error.message.includes("invalid")
      ) {
        status.value = "expired";
      } else {
        status.value = "error";
        errorMessage.value = error.message || "ການຢືນຢັນລົ້ມເຫຼວ";
      }
    }
  };

  const requestNewLink = () => {
    emailForResend.value = (route.query.email as string) || "";
    showEmailModal.value = true;
  };

  const sendNewVerificationLink = async () => {
    if (!emailForResend.value) {
      return message.error("ກະລຸນາປ້ອນອີເມວ");
    }

    if (!isValidEmail(emailForResend.value)) {
      return message.error("ທີ່ຢູ່ອີເມວບໍ່ຖືກຕ້ອງ");
    }

    try {
      isSending.value = true;
      const _resendEmailuseCase = await container.resolve(ResendEmailUseCase);

      await _resendEmailuseCase.execute(emailForResend.value);

      message.success("ສົ່ງລິ້ງຢືນຢັນໃໝ່ແລ້ວ");
      showEmailModal.value = false;
      
    } catch (error: any) {
      console.error("Resend error:", error);
      message.error("ສົ່ງລິ້ງໃໝ່ລົ້ມເຫຼວ");
    } finally {
      isSending.value = false;
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return {
    status,
    errorMessage,
    isRequesting,
    isSending,
    showEmailModal,
    emailForResend,
    verifyEmail,
    requestNewLink,
    sendNewVerificationLink,
    goToLogin,
  };
}
