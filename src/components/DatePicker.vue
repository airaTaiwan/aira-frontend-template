<script setup lang="ts">
import type { VueDatePickerProps } from '@vuepic/vue-datepicker'
import type { ComponentExposed } from 'vue-component-type-helpers'
import VueDatePicker from '@vuepic/vue-datepicker'

interface DatePickerProps extends /* @vue-ignore */ VueDatePickerProps {}
const props = defineProps<Partial<DatePickerProps>>()

const { locale } = useI18n()

const value = defineModel<VueDatePickerProps['modelValue']>('modelValue')

const datePickerRef = useTemplateRef<ComponentExposed<typeof VueDatePicker>>('datePickerRef')

const format = computed(() => props.enableTimePicker ? 'yyyy/MM/dd HH:mm' : 'yyyy/MM/dd')

defineExpose({
  clearValue: () => datePickerRef.value?.clearValue(),
})
</script>

<template>
  <VueDatePicker
    v-bind="props"
    ref="datePickerRef"
    v-model="value"
    :locale
    :max-date="props.maxDate ?? new Date()"
    :dark="isDark"
    :clearable="!!props.clearable"
    :enable-time-picker="!!props.enableTimePicker"
    :format="props.format ?? format"
    :state="undefined"
    @update:model-value="datePickerRef?.closeMenu()"
  >
    <template #action-preview />
  </VueDatePicker>
</template>
