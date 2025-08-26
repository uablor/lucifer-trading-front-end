<template>
  <a-form :hideRequiredMark="true" :model="form" name="register" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" autocomplete="off"
    @finish="onFinish" @finishFailed="onFinishFailed" class="login-form">
    <h2>{{ $t('register.title') }}</h2>

    <a-form-item :label="$t('register.name')" name="name" :rules="[{ required: true, message: $t('register.error.required_name') }]">
      <a-input v-model:value="form.name" size="large">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item :label="$t('register.email')" name="email" :rules="[
      { required: true, message: $t('register.error.required_email') },
      { type: 'email', message: $t('register.error.valid_email') }
    ]">
      <a-input v-model:value="form.email" size="large">
        <template #prefix>
          <MailOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item :label="$t('register.password')" name="password" :rules="[
      { required: true, message: $t('register.error.required_password') },
      { min: 6, message: $t('register.error.min_password') },
    ]">
      <a-input-password v-model:value="form.password" size="large">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item :label="$t('register.password')" name="password" :rules="[
      { required: true, message: $t('register.error.required_password') },
      { min: 6, message: $t('register.error.min_password') },
    ]">
      <a-input-password v-model:value="form.password" size="large">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    
    <a-form-item name="confirm" :rules="[{ required: true, message: $t('register.error.required_confirm') }]">
      <a-checkbox size="large" >
        {{ $t('register.confirm_18_years') }}
      </a-checkbox>
    </a-form-item>

    <a-form-item>
      <a-button class="social-button" type="primary" ghost  html-type="submit" block size="large" style="margin-top: 10px;" :loading="loading">
        {{ $t('register.submit') }}
      </a-button>
    </a-form-item>

    <div>
      {{ $t('register.you_have_account?') }}
    <router-link :to="{ name: 'auth.login' }">{{ $t('register.login') }}</router-link>
    </div>

        <div class="social-login">
      <a-button class="social-button google-button" size="large" @click="loginWithGoogle">
        <template #icon>
          <GoogleOutlined />
        </template>
        Google
      </a-button>
      <a-button class="social-button apple-button" size="large" @click="loginWithApple">
        <template #icon>
          <AppleOutlined />
        </template>
        Apple
      </a-button>
    </div>

  </a-form>
</template>

<script lang="ts" setup>
import { UserOutlined, LockOutlined,MailOutlined } from '@ant-design/icons-vue';
import { useRegisterForm } from '../composables/useAuth/useRegisterForm';
import { message } from 'ant-design-vue';

const {  form, onFinish, loading, onFinishFailed } = useRegisterForm();

const loginWithGoogle = () => {
  message.info('Google login integration coming soon!');
};

const loginWithApple = () => {
  message.info('Apple login integration coming soon!');
};
</script>

<style scoped lang="scss">
.login-form {
  background: #f0f0f0;
  box-shadow: 
    20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
  border: none;
  max-width: 400px;
  margin: 100px auto;
  padding: 32px 24px;
  border: 1px solid #e7e4e4;
  border-radius: 12px;
  background: #fff;
}


/* Social Login */
.social-login {
  display: flex;
  margin: 24px auto;
  gap: 12px;
  margin-bottom: 32px;
}

.social-button {

  flex: 1;
  height: 48px;
  border-radius: 12px;
  border: 2px solid #f0f0f0;
  background: white;
  color: #595959;
  font-weight: 500;
  transition: all 0.3s ease;
}

.social-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.google-button:hover {
  border-color: #db4437;
  color: #db4437;
}

.apple-button:hover {
  border-color: #000;
  color: #000;
}

/* Responsive Design */
@media (max-width: 768px) {

  .social-login {
    flex-direction: column;
  }

  .form-options {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}


/* Loading Animation */
.submit-button.ant-btn-loading {
  background: linear-gradient(135deg, #40a9ff, #9254de);
}

/* Focus States */
.form-input:focus-within {
  border-color: #1890ff !important;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1) !important;
}

/* Error States */
.form-item :deep(.ant-form-item-has-error .ant-input) {
  border-color: #ff4d4f;
}

.form-item :deep(.ant-form-item-has-error .ant-input:focus) {
  border-color: #ff4d4f;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1);
}
</style>
