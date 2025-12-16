<template>
  <a-form :hideRequiredMark="true" :model="form" name="basic" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" autocomplete="off"
    @finish="onFinish" @finishFailed="onFinishFailed" class="login-form">
    <h2 class="login-title">{{ $t('login.welcome') }} </h2>
    
    <!-- <h3 class="login-subtitle">Professional Trading Platform</h3> -->
    <p class="login-description">Sign in to access your trading dashboard</p>

    <a-form-item :label="$t('login.email')" name="email" :rules="[
      { required: true, message: $t('login.error') },
      { type: 'email', message: $t('login.error') }
    ]">
      <a-input v-model:value="form.email" size="large" autocomplete="email">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item :label="$t('login.password')" name="password"  :rules="[
      { required: true, message: $t('login.error') }
    ]">
      <a-input-password v-model:value="form.password" size="large" autocomplete="current-password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <div style="margin: 10px 0px;">
      {{ $t('login.forgot_password?') }}
      <router-link to="/forgot-password">{{ $t('login.forgot_password') }}</router-link>
    </div>


    <a-form-item>
      <a-button class="social-button" type="primary" ghost html-type="submit" block size="large" style="margin-top: 10px;" :loading="loading">
        {{ $t('login.submit') }}
      </a-button>
    </a-form-item>
    <div>
      {{ $t('login.you_have_account?') }}
      <router-link :to="{ name: 'auth.register' }">{{ $t('login.register') }}</router-link>
    </div>

    <!-- Social Login -->
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
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useLoginForm } from '../composables/useAuth/useLoginForm';
import { message } from 'ant-design-vue';

const { form, onFinish, loading, onFinishFailed } = useLoginForm();
const loginWithGoogle = () => {
  message.info('Google login integration coming soon!');
};

const loginWithApple = () => {
  message.info('Apple login integration coming soon!');
};

</script>

<style scoped>

.login-form {
  border: none;
  max-width: 400px;
  padding: 12px 24px;

  & h2 {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 8px;
    color: #1f1f1f;
  }

  & p {
    font-size: 14px;
    text-align: center;
    margin-bottom: 50px;
    color: #8c8c8c;
  }
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
