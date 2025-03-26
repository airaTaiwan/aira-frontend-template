<script setup lang="ts">
import type { VueDatePickerProps } from '@vuepic/vue-datepicker'
import type { ComponentExposed } from 'vue-component-type-helpers'
import VueDatePicker from '@vuepic/vue-datepicker'

const props = withDefaults(defineProps</* @vue-ignore */VueDatePickerProps>(), {
  maxDate: () => new Date(),
  clearable: false,
  dark: isDark.value,
})

const { locale } = useI18n()

const datePickerRef = useTemplateRef<ComponentExposed<typeof VueDatePicker>>('datePickerRef')
</script>

<template>
  <VueDatePicker
    v-bind="props"
    ref="datePickerRef"
    :locale
    @update:model-value="datePickerRef?.closeMenu()"
  >
    <template #action-preview />
  </VueDatePicker>
</template>
