<template>
  <EmailVerification
    :userEmail="email"
    :onVerificationSuccess="onSuccess"
    :onChangeEmail="changeEmail"
  />
</template>

<script setup lang="ts">
import EmailVerification from '@modules/auth/components/emailVerify/VerifyView.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const email = ref<string>(); 

function onSuccess() {
  // ทำอะไรต่อเมื่อยืนยันสำเร็จ เช่น ไปหน้า dashboard
  console.log('Verification successful');
}

async function changeEmail(newEmail: string) {
  // ส่ง newEmail ไป backend เพื่ออัปเดตและส่งโค้ดใหม่
  console.log('New email to update:', newEmail);
  // ตัวอย่าง: await api.updateEmail(newEmail)
}
onMounted(() => {
  email.value = router.currentRoute.value.query.email as string;
})
</script>
