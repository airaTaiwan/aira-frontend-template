<script setup lang="ts">
import type { ComponentExposed } from 'vue-component-type-helpers'
import VueDatePicker from '@vuepic/vue-datepicker'

const {
  mode = 'date',
  dark = isDark.value,
  range = false,
  limit = '',
} = defineProps<{
  mode?: string
  dark?: boolean
  range?: boolean
  limit?: string
}>()

const { locale } = useI18n()

const datePickerRef = useTemplateRef<ComponentExposed<typeof VueDatePicker>>('datePickerRef')

type DateValue<T extends boolean> = T extends true ? [string, string] | null : string | null
const selected = defineModel<DateValue<typeof range>>({ required: false, default: null })

const { enableTimePicker, format } = (() => {
  switch (mode) {
    case 'date': {
      return {
        enableTimePicker: false,
        format: 'yyyy-MM-dd',
      }
    }

    case 'date-time': {
      return {
        enableTimePicker: true,
        format: 'yyyy-MM-dd HH:mm',
      }
    }

    default: {
      return {
        enableTimePicker: false,
        format: 'yyyy-MM-dd',
      }
    }
  }
})()
</script>

<template>
  <VueDatePicker
    ref="datePickerRef"
    v-model="selected"
    :dark
    :input-class-name="dark ? '!border-gray-500 !border !text-base !py-1.5 !leading-6' : '!border-gray-300 !border !text-base !py-1.5 !leading-6'"
    :clearable="false"
    :enable-time-picker
    :format
    :model-type="format"
    :preview-format="format"
    :locale
    :range
    :limit
    :max-date="new Date()"
    @update:model-value="datePickerRef?.closeMenu()"
  >
    <template #action-preview />
  </VueDatePicker>
</template>
