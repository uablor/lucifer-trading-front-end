<template>
  <div class="language-switcher">
    <a-dropdown :trigger="['click']" placement="bottomRight">
      <a-button class="language-button" @click.prevent>
        <span class="flag-icon">{{ currentLanguage.flag }}</span>
        <span class="language-text">{{ currentLanguage.name }}</span>
        <DownOutlined />
      </a-button>
      <template #overlay>
        <a-menu @click="handleLanguageChange" :selected-keys="[currentLocale]">
          <a-menu-item 
            v-for="lang in languages" 
            :key="lang.code"
            class="language-menu-item"
          >
            <span class="flag-icon">{{ lang.flag }}</span>
            <span class="language-name">{{ lang.name }}</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Dropdown as ADropdown, Button as AButton, Menu as AMenu, MenuItem as AMenuItem } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import type { Key } from 'ant-design-vue/es/_util/type'

// Types
interface Language {
  code: string
  name: string
  flag: string
  nativeName: string
}

// i18n composable
const { locale } = useI18n()

// Language options
const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English'
  },
  {
    code: 'th',
    name: 'Thai',
    flag: '🇹🇭',
    nativeName: 'ไทย'
  },
  {
    code: 'lo',
    name: 'Lao',
    flag: '🇱🇦',
    nativeName: 'ລາວ'
  }
]

// Computed properties
const currentLocale = computed(() => locale.value)

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === currentLocale.value) || languages[0]
})

// Methods
const handleLanguageChange = ({ key }: { key: Key }) => {
  if (key !== currentLocale.value) {
    locale.value = key as string
    // Store preference in localStorage
    localStorage.setItem('preferred-language', key as string)
    
    // Emit event for parent components if needed
    emits('languageChanged', key as string)
  }
}

// Emits
const emits = defineEmits<{
  languageChanged: [locale: string]
}>()
</script>

<style lang="scss" scoped>
.language-switcher {
  .language-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: #40a9ff;
      box-shadow: 0 2px 4px rgba(64, 169, 255, 0.1);
    }

    .flag-icon {
      font-size: 16px;
      line-height: 1;
    }

    .language-text {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    :deep(.anticon) {
      font-size: 12px;
      color: #999;
    }
  }
}

:deep(.ant-dropdown-menu) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 4px 0;

  .language-menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f5f5f5;
    }

    &.ant-menu-item-selected {
      background-color: #e6f7ff;
      color: #1890ff;
    }

    .flag-icon {
      font-size: 16px;
      line-height: 1;
    }

    .language-name {
      font-size: 14px;
      font-weight: 500;
    }
  }
}

// Dark theme support
@media (prefers-color-scheme: dark) {
  .language-switcher {
    .language-button {
      background: #141414;
      border-color: #434343;
      color: #fff;

      .language-text {
        color: #fff;
      }

      &:hover {
        border-color: #177ddc;
      }
    }
  }

  :deep(.ant-dropdown-menu) {
    background: #1f1f1f;
    
    .language-menu-item {
      color: #fff;

      &:hover {
        background-color: #262626;
      }

      &.ant-menu-item-selected {
        background-color: #111b26;
        color: #177ddc;
      }
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .language-switcher {
    .language-button {
      padding: 4px 8px;

      .language-text {
        display: none;
      }
    }
  }
}
</style>