<template>
  <mainComponent />

  <a-drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    placement="right"
    :closable="true"
    :mask-closable="false"
    @close="handleClose"
    @after-open-change="afterOpenChange"
  >
    <RouterView />
  </a-drawer>
</template>

<script setup lang="ts">
import mainComponent from '../components/main/main.component.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const router = useRouter();
const route = useRoute();

const open = ref(false);

watch(
  () => route.name,
  (newName) => {
    if (newName === 'auth.login' || newName === 'auth.register') {
      open.value = true;
    } else {
      open.value = false;
    }
  },
  { immediate: true } // ให้ทำงานทันทีตอน mount
);

const afterOpenChange = (bool: boolean) => {
//   console.log('open', bool);
};

const handleClose = () => {
  open.value = false;
  router.push({ name: 'homepage' });
};
</script>
