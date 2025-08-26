<template>
  <div class="student">
    <div class="mune-bar-student">
      <div>
        <a-typography-title :level="3">
          <UserOutlined style="margin-right: 10px" />
          {{ $t('student.title') }}
        </a-typography-title>
      </div>
      <div class="create-search-student">
        <FilterComponent />
        <SearchComponent />
        <CreateStudentForm />
      </div>
    </div>
    <div class="student-list-form">
      <ListStudentForm />
    </div>
  </div>


</template>

<script setup lang="ts">
import FilterComponent from '../components/crud/Filter.component.vue';
import { UserOutlined } from '@ant-design/icons-vue';
import ListStudentForm from '../components/ListStudentForm.vue';
import CreateStudentForm from '../components/crud/CreateStudentForm.vue';
import SearchComponent from '../components/crud/Search.component.vue';
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
