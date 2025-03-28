<script setup lang="ts">
import type { ComponentExposed } from 'vue-component-type-helpers'
import type DeleteModal from '~/components/modal/DeleteModal.vue'

import { CButton, CCol, CRow } from '@coreui/vue-pro'
import Step1Form from '~/modules/manage/config/Step1Form.vue'
import Done from '~/modules/manage/Done.vue'

// import type { Config } from '~/types/config'
interface Config {}

const router = useRouter()

const { t } = useI18n()

// const { mutateAsync: createConfig } = useCreateConfig()
// const { mutateAsync: updateConfig, selectedConfig } = useUpdateConfig()

const editData = ref<Config | null>(null)
const { cloned: _requestData, sync } = useCloned(editData, { manual: true })

const modalRef = useTemplateRef<ComponentExposed<typeof DeleteModal>>('modalRef')

const validStep = ref(false)
const currentStep = ref(0)

const stepComponent = computed(() => {
  switch (currentStep.value) {
    case 0:
      return Step1Form
    default:
      return Done
  }
})

function valid(val: boolean) {
  validStep.value = val
}

function onPrev() {
  if (currentStep.value === 0) {
    modalRef.value?.open()
    return
  }

  currentStep.value -= 1
}

async function onNext() {
  if (currentStep.value === 1) {
    router.push('/manage/config/list')
    return
  }
  else {
    sync()
  }

  // if (currentStep.value === 0 && requestData.value != null) {
  //   requestData.value._id.length === 0
  //     ? createConfig(requestData.value)
  //     : updateConfig(requestData.value)
  // }
  currentStep.value++
}

function onReset() {
  currentStep.value = 0
  modalRef.value?.close()
  router.push('/manage/config/list')
}

onMounted(() => {
  if (editData.value == null)
    router.push('/manage/config/list')
})
</script>

<template>
  <section h-full of="x-hidden y-auto">
    <CRow h-full of-y-auto>
      <CCol sm="12">
        <CRow :sm="{ cols: 1, gutterY: 3 }">
          <CCol>
            <StepProgress
              :steps="[
                '測試',
                t('common.done'),
              ]"
              :current-step
            />
          </CCol>

          <CCol v-if="editData">
            <Transition name="fade" mode="out-in">
              <CCol sm="10" mxa>
                <component :is="stepComponent" :data="editData" @valid="valid" />
              </CCol>
            </Transition>
          </CCol>

          <CCol>
            <div mb-4 flex="~ items-center justify-center" gap-x-3>
              <CButton
                v-if="currentStep !== 1"
                :class="currentStep === 0 ? 'bg-coreui-secondary' : 'bg-coreui-info'"
                :color="currentStep === 0 ? 'secondary' : 'info'"
                @click="onPrev"
              >
                {{ currentStep === 0 ? t('common.cancel') : t('common.previous') }}
              </CButton>
              <CButton
                color="info"
                :disabled="!validStep"
                @click="onNext"
              >
                {{ currentStep === 1 ? t('common.back') : t('common.next') }}
              </CButton>
            </div>
          </CCol>
        </CRow>

        <DeleteModal ref="modalRef" @on-confirm="onReset">
          <template #body>
            {{ t('modal.delete.confirm') }}
          </template>
        </DeleteModal>
      </CCol>
    </CRow>
  </section>
</template>

<route lang="yaml">
  meta:
    layout: manage
</route>
