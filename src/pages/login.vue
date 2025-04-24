<script setup lang="ts">
import type { UserForm } from '~/types/user'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
} from '@coreui/vue-pro'

import { useRouter } from 'vue-router'
import { availableLocales, languageOptionMap, loadLanguageAsync } from '~/plugin/i18n'

const router = useRouter()

const { t, locale } = useI18n()

const user = useUserStore()

const languageOptions = computed(() => availableLocales.map(locale => ({ label: languageOptionMap.get(locale)!, value: locale })))

const formData = ref<UserForm>({
  username: '',
  password: '',
})

const viewPasword = ref(false)
const rememberMe = useStorage<boolean>('rememberMe', false)

const validate = computed(() => formData.value.username && formData.value.password)

async function onLogin(formData: UserForm) {
  const loginStatus = await user.login(formData, rememberMe.value)

  if (loginStatus)
    router.push('/')
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <CCard position="absolute top-1/2 left-1/2" translate-x="-1/2" max-w-96 w-full p-3 translate-y="-1/2">
      <CForm class="h-full flex flex-col" @submit.prevent="onLogin(formData)">
        <CCardHeader>
          <h1 mb-2 text-4xl font-500>
            {{ t('login.title') }}
          </h1>
        </CCardHeader>
        <CCardBody space-y-4>
          <p text-sm text="[#768192]">
            {{ t('login.subTitle') }}
          </p>

          <CInputGroup>
            <CInputGroupText>
              <div i-cil-user h-4 w-4 />
            </CInputGroupText>
            <CFormInput v-model="formData.username" :placeholder="t('login.usernamePlaceholder')" autocomplete="username" />
          </CInputGroup>

          <CInputGroup>
            <CInputGroupText>
              <div i-cil-lock-locked h-4 w-4 />
            </CInputGroupText>
            <CFormInput
              v-model="formData.password"
              :type="viewPasword ? 'text' : 'password'"
              :placeholder="t('login.passwordPlaceholder')"
              autocomplete="current-password"
            />
            <CInputGroupText cursor-pointer text-xl @click="viewPasword = !viewPasword">
              <TogglePassword v-model="viewPasword" />
            </CInputGroupText>
          </CInputGroup>

          <CInputGroup>
            <CInputGroupText>
              <div i-cil-language h-4 w-4 />
            </CInputGroupText>
            <CFormSelect
              :options="languageOptions"
              :value="locale"
              @update:model-value="loadLanguageAsync"
            />
          </CInputGroup>

          <div flex="~ col" space-y-2>
            <CFormSwitch v-model="rememberMe" size="lg" :label="t('login.rememberMe')" />

            <AsyncButton
              type="submit"
              my-2 w-35 self-center
              color="info"
              :disabled="!validate"
            >
              {{ t('login.loginButton') }}
            </AsyncButton>
          </div>
        </CCardBody>
        <CCardFooter>
          <div flex="~ items-center" text="[#808080]">
            <p>{{ t('login.version') }}: {{ frontEndVersion }}</p>
          </div>
        </CCardFooter>
      </CForm>
    </CCard>
  </Transition>
</template>

<style scoped>
* {
  --cui-card-cap-padding-y: 0.75rem;
  --cui-card-cap-padding-x: 1.25rem;
  --cui-card-cap-bg: none;
  --cui-card-spacer-y: 1.25rem;
  --cui-card-spacer-x: 1.25rem;
  --cui-form-check-label-color: #808080;
}

:global(#app) {
  display: grid;
  place-items: center;
}

* :deep(.form-control),
* :deep(.form-select) {
  font-size: 0.875rem;
}
</style>

<route lang="yaml">
meta:
  layout: false
</route>
