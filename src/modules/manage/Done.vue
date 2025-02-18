<script setup lang="ts" generic="T">
import { CCard, CCardBody } from '@coreui/vue-pro'

defineProps<{
  data: T
}>()

const { t } = useI18n()
</script>

<template>
  <CCard h-full min-h-160>
    <CCardBody flex="~ items-center justify-center" text-20>
      {{ t('common.done') }}
    </CCardBody>
  </CCard>
</template>
