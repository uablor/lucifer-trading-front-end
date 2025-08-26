<template>
    <div class="delete-modal-wrapper">

        <!-- Enhanced Delete Modal -->
        <a-modal v-model:open="composable.open_delete.value" :title="null" :footer="null" :width="460"
            :mask-closable="false" :closable="false" class="delete-confirmation-modal" :body-style="{ padding: '0' }">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="warning-icon-container">
                        <ExclamationCircleOutlined class="warning-icon" />
                    </div>
                    <div class="header-text">
                        <h3 class="modal-title">{{ $t('common.delete_confirmation') }}</h3>
                        <p class="modal-subtitle">{{ $t('common.action_irreversible') }}</p>
                    </div>
                </div>

                <div class="modal-body">
                    <div class="warning-message">
                        <p class="confirm-text">{{ $t('common.confirm_delete_message') }}</p>

                        <div class="delete-options">
                            <div class="option-card" :class="{ active: !composable.isHardDelete?.value }"
                                v-if="store.query.is_active === Status.ACTIVE">
                                <a-radio :checked="!composable.isHardDelete?.value"
                                    @change="composable.toggleSoftDelete" class="delete-radio">
                                    <div class="option-content">
                                        <div class="option-header">
                                            <RestOutlined class="option-icon soft" />
                                            <span class="option-title">{{ $t('common.soft_delete') }}</span>
                                        </div>
                                        <span class="option-description">{{ $t('common.soft_delete_desc') }}</span>
                                    </div>
                                </a-radio>
                            </div>

                            <div class="option-card" :class="{ active: composable.isHardDelete?.value }">
                                <a-radio :checked="composable.isHardDelete?.value" @change="composable.toggleHardDelete"
                                    class="delete-radio">
                                    <div class="option-content">
                                        <div class="option-header">
                                            <DeleteOutlined class="option-icon hard" />
                                            <span class="option-title">{{ $t('common.hard_delete') }}</span>
                                        </div>
                                        <span class="option-description">{{ $t('common.hard_delete_desc') }}</span>
                                    </div>
                                </a-radio>
                            </div>
                        </div>

                        <a-alert v-if="composable.isHardDelete?.value" :message="$t('common.hard_delete_warning')"
                            type="error" show-icon class="hard-delete-warning" />
                    </div>
                </div>

                <div class="modal-footer">
                    <a-space :size="12">
                        <a-button @click="composable.cancelDelete" :disabled="composable.isDeleting?.value"
                            class="cancel-btn">
                            {{ $t('common.cancel') }}
                        </a-button>

                        <a-button type="primary" danger :loading="composable.isDeleting?.value"
                            :disabled="!composable.isHardDelete?.value === true && store.query.is_active === Status.INACTIVE"
                            @click="composable.confirmDelete" class="confirm-btn">
                            <template #icon v-if="!composable.isDeleting?.value">
                                <DeleteOutlined />
                            </template>
                            {{ composable.isDeleting?.value ? $t('common.deleting') : $t('common.delete') }}
                        </a-button>
                    </a-space>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    RestOutlined
} from '@ant-design/icons-vue'
import type AdminUserFormService from '../../composables/course.composable'

import { Status } from '@/shared/enums/pagination.query.enum';
import { useCourseCompletionStore } from '../../stores/use-Couese-Comple.store';

const store = useCourseCompletionStore()

defineProps<{
    composable: AdminUserFormService
}>()

</script>

<style scoped lang="scss">
.delete-modal-wrapper {
    display: inline-block;
}

.delete-trigger-btn {
    border-radius: 8px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(255, 77, 79, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.delete-trigger-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3);
}

.modal-content {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    overflow: hidden;
}

.modal-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 24px 24px 20px;
    background: linear-gradient(135deg, #fff5f5 0%, #fff1f1 100%);
    border-bottom: 1px solid #ffebe6;
}

.warning-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #ff7875 0%, #ff4d4f 100%);
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3);
}

.warning-icon {
    color: #fff;
    font-size: 24px;
}

.header-text {
    flex: 1;
}

.modal-title {
    margin: 0 0 4px;
    font-size: 18px;
    font-weight: 600;
    color: #262626;
    line-height: 1.4;
}

.modal-subtitle {
    margin: 0;
    font-size: 14px;
    color: #8c8c8c;
    line-height: 1.4;
}

.modal-body {
    padding: 20px 24px;
}

.confirm-text {
    margin: 0 0 20px;
    font-size: 15px;
    color: #595959;
    line-height: 1.6;
}

/* Delete Options */
.delete-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
}

.option-card {
    border: 2px solid #f0f0f0;
    border-radius: 8px;
    padding: 14px;
    transition: all 0.3s ease;
    cursor: pointer;
    background: #fafafa;
}

.option-card:hover {
    border-color: #d9d9d9;
    background: #fff;
}

.option-card.active {
    border-color: #1890ff;
    background: #f6ffed;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
}

.delete-radio {
    width: 100%;
}

.option-content {
    margin-left: 8px;
}

.option-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
}

.option-icon {
    font-size: 16px;
}

.option-icon.soft {
    color: #52c41a;
}

.option-icon.hard {
    color: #ff4d4f;
}

.option-title {
    font-weight: 600;
    color: #262626;
    font-size: 14px;
}

.option-description {
    color: #8c8c8c;
    font-size: 13px;
    line-height: 1.4;
}

.hard-delete-warning {
    margin-top: 16px;
    border-radius: 6px;
}

.modal-footer {
    padding: 16px 24px 24px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
}

.cancel-btn {
    border-radius: 6px;
    font-weight: 500;
}

.confirm-btn {
    border-radius: 6px;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(255, 77, 79, 0.2);
    transition: all 0.3s ease;
}

.confirm-btn:hover {
    box-shadow: 0 4px 12px rgba(255, 77, 79, 0.4);
    transform: translateY(-1px);
}

/* Global Modal Styles */
:deep(.delete-confirmation-modal .ant-modal-content) {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

:deep(.delete-confirmation-modal .ant-modal-mask) {
    backdrop-filter: blur(4px);
    background: rgba(0, 0, 0, 0.6);
}

/* Responsive */
@media (max-width: 576px) {
    .modal-header {
        padding: 20px 16px 16px;
    }

    .modal-body {
        padding: 16px;
    }

    .modal-footer {
        padding: 12px 16px 20px;
    }

    .option-card {
        padding: 12px;
    }
}
</style>