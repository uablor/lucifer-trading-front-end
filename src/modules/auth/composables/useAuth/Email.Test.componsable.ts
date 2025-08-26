// composables/Email.Test.componsable.ts
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
type VerificationStatus = 'initial' | 'loading' | 'success' | 'error' | 'expired';

export function useEmailVerification() {
  const verificationStatus = ref<VerificationStatus>('initial');
  const errorMessage = ref('');
  const isResending = ref(false);
  const isChangingEmail = ref(false);
  const showChangeEmailModal = ref(false);
  const newEmail = ref('');
  const router = useRouter();


  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const verifyEmailFromToken = async (token: string, onSuccess?: () => void) => {
    try {
      verificationStatus.value = 'loading';

      const res = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      const data = await res.json();

      if (res.ok) {
        verificationStatus.value = 'success';
        message.success('ຢືນຢັນອີເມວສຳເລັດ!');
        onSuccess?.();
      } else {
        throw new Error(data.message || 'Verification failed');
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      if (err.message.includes('expired') || err.message.includes('invalid')) {
        verificationStatus.value = 'expired';
      } else {
        verificationStatus.value = 'error';
        errorMessage.value = err.message || 'ເກີດຂໍ້ຜິດພາດໃນການຢືນຢັນອີເມວ';
      }
    }
  };

  const resendVerification = async (email: string) => {
    if (!validateEmail(email)) {
      message.error('ອີເມວບໍ່ຖືກຕ້ອງ');
      return;
    }

    try {
      isResending.value = true;
      const res = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!res.ok) throw new Error('Failed to resend verification email');

      message.success('ສົ່ງລິ້ງຢືນຢັນໃໝ່ແລ້ວ');
      verificationStatus.value = 'initial';
    } catch (err) {
      console.error(err);
      message.error('ການສົ່ງລິ້ງລົ້ມເຫຼວ');
    } finally {
      isResending.value = false;
    }
  };

  const changeEmail = () => {
    showChangeEmailModal.value = true;
  };

  const handleChangeEmail = async (
    email: string,
    onChangeCallback?: (email: string) => Promise<void>
  ) => {
    if (!validateEmail(email)) {
      message.error('ກະລຸນາປ້ອນອີເມວທີ່ຖືກຕ້ອງ');
      return;
    }

    try {
      isChangingEmail.value = true;

      if (onChangeCallback) {
        await onChangeCallback(email);
      } else {
        await updateEmailAndResendVerification(email);
      }

      message.success('ອັບເດດອີເມວສຳເລັດ ແລະ ສົ່ງລິ້ງຢືນຢັນໃໝ່ແລ້ວ');
      showChangeEmailModal.value = false;
      verificationStatus.value = 'initial';
    } catch (err) {
      console.error(err);
      message.error('ແກ້ໄຂອີເມວບໍ່ສຳເລັດ');
    } finally {
      isChangingEmail.value = false;
    }
  };

  const updateEmailAndResendVerification = async (email: string) => {
    const res = await fetch('/api/update-email-and-resend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!res.ok) {
      throw new Error('Failed to update and resend email');
    }
  };

  const goToLogin = () => {
  router.push('/login');
};

  return {
    verificationStatus,
    errorMessage,
    isResending,
    isChangingEmail,
    showChangeEmailModal,
    newEmail,
    goToLogin,

    verifyEmailFromToken,
    resendVerification,
    changeEmail,
    handleChangeEmail,
    validateEmail,
  };
}
