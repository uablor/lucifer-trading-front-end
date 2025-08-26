<template>
  <div class="student">
    <div class="student-list-form">
      <ListTeacherForm />
    </div>
  </div>
</template>

<script setup lang="ts">
// import FilterComponent from '../components/crud/Filter.component.vue';
// import { UserOutlined } from '@ant-design/icons-vue';
import ListTeacherForm from '../components/ListForm.vue';
// import CreateTeacherForm from '@/modules/admin/student_education/components/crud/CreateForm.vue';
// import SearchComponent from '../components/crud/Search.component.vue';
</script>

<style scoped lang="scss">
.student {
  padding: 20px;

  & .mune-bar-student {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    & .create-search-student {
      display: flex;
      gap: 20px;
      justify-content: flex-end;

      & h2 {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }



  & .student-list-form {
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
