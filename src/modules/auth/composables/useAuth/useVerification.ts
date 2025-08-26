// composables/useVerification.ts
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
export function useVerification(userEmailProp: string, onVerificationSuccess?: () => void, onChangeEmailCallback?: (newEmail: string) => Promise<void>) {
  const router = useRouter();
  const formRef = ref();
  const countdownTimer = ref<any>();
  const form = reactive({ verificationCode: '' });
  const isVerifying = ref(false);
  const isResending = ref(false);
  const isChangingEmail = ref(false);
  const countdown = ref(0);
  const showChangeEmailModal = ref(false);
  const newEmail = ref(userEmailProp);

  const rules = {
    verificationCode: [
      { required: true, message: 'ກະລຸນາປ້ອນລະຫັດຢືນຢັນ' },
      { len: 6, message: 'ລະຫັດຢືນຢັນຕ້ອງມີ 6 ຫຼັກ' },
      { pattern: /^\d{6}$/, message: 'ລະຫັດຢືນຢັນຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ' }
    ]
  };

  const handleCodeInput = (value: string) => {
    form.verificationCode = value.replace(/\D/g, '');
  };

  const handleVerify = async () => {
    try {
      isVerifying.value = true;
      await verifyEmailCode(form.verificationCode);
      message.success('ຢືນຢັນອີເມວສຳເລັດ!');

      if (onVerificationSuccess) {
        onVerificationSuccess();
      } else {
        router.push('/login');
      }
    } catch (error: any) {
      message.error(error.message || 'ລະຫັດຢືນຢັນບໍ່ຖືກຕ້ອງ');
    } finally {
      isVerifying.value = false;
    }
  };

  const resendCode = async () => {
    try {
      isResending.value = true;
      await resendVerificationCode(userEmailProp);
      message.success('ສົ່ງລະຫັດຢືນຢັນຄືນໃໝ່ແລ້ວ');
      startCountdown();
    } catch (error: any) {
      message.error(error.message || 'ເກີດຂໍ້ຜິດພາດໃນການສົ່ງລະຫັດຄືນໃໝ່');
    } finally {
      isResending.value = false;
    }
  };

  const changeEmail = () => {
    newEmail.value = userEmailProp;
    showChangeEmailModal.value = true;
  };

  const handleChangeEmail = async () => {
    if (!newEmail.value || !validateEmail(newEmail.value)) {
      message.error('ກະລຸນາປ້ອນອີເມວທີ່ຖືກຕ້ອງ');
      return;
    }

    try {
      isChangingEmail.value = true;

      if (onChangeEmailCallback) {
        await onChangeEmailCallback(newEmail.value);
      } else {
        await updateUserEmail(newEmail.value);
      }

      message.success('ອັບເດດອີເມວສຳເລັດ');
      showChangeEmailModal.value = false;
      startCountdown();
    } catch (error: any) {
      message.error(error.message || 'ເກີດຂໍ້ຜິດພາດໃນການປ່ຽນອີເມວ');
    } finally {
      isChangingEmail.value = false;
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const startCountdown = () => {
    countdown.value = 60;
    countdownTimer.value = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(countdownTimer.value);
      }
    }, 1000);
  };

  const verifyEmailCode = async (code: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === '123456') resolve();
        else reject(new Error('ລະຫັດຢືນຢັນບໍ່ຖືກຕ້ອງ'));
      }, 1500);
    });
  };

  const resendVerificationCode = async (_email: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  };

  const updateUserEmail = async (_email: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  };

  onMounted(startCountdown);
  onUnmounted(() => {
    if (countdownTimer.value) clearInterval(countdownTimer.value);
  });

  return {
    formRef,
    form,
    rules,
    isVerifying,
    isResending,
    isChangingEmail,
    countdown,
    showChangeEmailModal,
    newEmail,
    handleCodeInput,
    handleVerify,
    resendCode,
    changeEmail,
    handleChangeEmail
  };
}
