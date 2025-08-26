<template>
    <a-layout-footer class="footer">
        <a-row :gutter="16" class="footer-top">
            <a-col :xs="24" :sm="12" :md="8">
                <div class="footer-logo">
                    <img src="../../../../assets/images/logo/logo.jpg" class="logo"/>
                    <span class="footer-title">{{ $t('footer.title') }}</span>
                </div>
                <p class="footer-text">&copy; 2024 Lucifer Trade. All rights reserved.</p>
                <p class="footer-text">
                    Email:
                    <a href="mailto:Lucifer@gmail.com" class="footer-link">Lucifer@gmail.com</a>
                </p>
            </a-col>

            <a-col :xs="24" :sm="12" :md="8">
                <div class="footer-license">
                    <p>{{ $t('footer.license_info.licensed') }}</p>
                    <p>{{ $t('footer.license_info.registered_since') }}</p>
                    <p>{{ $t('footer.license_info.address') }}</p>
                </div>
            </a-col>

            <a-col :xs="24" :sm="24" :md="8">
                <ul class="footer-links">
                    <li><a href="#">{{ $t('footer.help_options.help') }}</a></li>
                    <li><a href="#">{{ $t('footer.help_options.terms_of_use') }}</a></li>
                    <li><a href="#">{{ $t('footer.help_options.privacy_policy') }}</a></li>
                    <li><a href="#">{{ $t('footer.help_options.about_us') }}</a></li>
                    <li><a href="#">{{ $t('footer.help_options.how_to_register') }}</a></li>
                </ul>

                <div class="footer-controls">
                    
                    <a-space>
                        <LanguageSwitcher @language-changed="onLanguageChanged" />
                        <span>🌙</span>
                        <a-select v-model:value="theme" style="width: 120px">
                            <a-select-option value="dark">{{ $t('footer.dark_mode') }}</a-select-option>
                            <a-select-option value="light">{{ $t('footer.light_mode') }}</a-select-option>
                        </a-select>
                    </a-space>
                </div>
            </a-col>
        </a-row>

        <a-divider />

        <div class="footer-bottom">
            <p>{{ $t('footer.risk_warning') }}</p>
            <p>{{ $t('footer.disclaimer') }}</p>
        </div>
    </a-layout-footer>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import LanguageSwitcher from '@shared/ui/Language_switcher.component.vue'
import { message } from "ant-design-vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const theme = ref<string>("dark")

const onLanguageChanged = (locale: string) => {
    console.log('Language changed to:', locale)
    message.success(t('common.success'))
}
</script>

<style lang="scss" scoped>
.footer {
    background: #fff;
    color: #000000;
    padding: 40px 20px;

    .footer-top {
        margin-bottom: 20px;
    }

    .footer-logo {
        display: flex;
        align-items: center;
        gap: 10px;

        .logo {
            height: 50px;
        }

        .footer-title {
            font-size: 16px;
            font-weight: bold;
        }
    }

    .footer-text {
        margin: 4px 0;
        font-size: 13px;

        .footer-link {
            color: #fa8c16;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .footer-license {
        p {
            margin: 4px 0;
            font-size: 13px;
        }
    }

    .footer-links {
        list-style: none;
        padding: 0;
        margin: 0 0 12px;

        li {
            a {
                display: block;
                color: #000000;
                font-size: 13px;
                margin: 4px 0;
                transition: color 0.3s;

                &:hover {
                    color: #fff;
                }
            }
        }
    }

    .footer-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .footer-bottom {
        text-align: center;
        font-size: 12px;
        line-height: 1.6;
    }
}
</style>
