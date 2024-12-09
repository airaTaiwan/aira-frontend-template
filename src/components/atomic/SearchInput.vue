<script setup lang="ts">
import { CFormInput, CFormLabel, CInputGroup, CInputGroupText } from '@coreui/vue-pro'

const { icon = 'i-cil-magnifying-glass' } = defineProps<{
  icon?: string
  label?: string
  placeholder?: string
}>()

const { t } = useI18n()

const id = useId()

const searchText = defineModel({ required: false, default: '' })
</script>

<template>
  <CFormLabel :for="`search-input-${id}`">
    {{ label ?? t('search.name') }}
  </CFormLabel>
  <CInputGroup>
    <CInputGroupText>
      <div :class="icon" h-4 w-4 />
    </CInputGroupText>
    <CFormInput :id="`search-input-${id}`" v-model="searchText" type="text" :placeholder />
  </CInputGroup>
</template>
