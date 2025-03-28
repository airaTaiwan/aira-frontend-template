<script setup lang="ts">
import type { ComponentProps } from 'vue-component-type-helpers'
import VueFormMultiselect from '@vueform/multiselect'

interface MultiSelectProps extends /* @vue-ignore */ ComponentProps<typeof VueFormMultiselect> {}
const props = defineProps<MultiSelectProps>()

const { t } = useI18n()

const value = defineModel<string[]>({ required: true })
</script>

<template>
  <VueFormMultiselect
    v-bind="props"
    v-model="value"
    label="label"
    value-prop="value"
    append-new-tag
    group-select
    show-options
    :append-to-body="false"
    :no-options-text="t('select.noItem')"
    :no-results-text="t('select.noItem')"
  />
</template>

<style>
* {
  --ms-ring-color: transparent;
  --ms-tag-bg: #6cbbff;
  --ms-option-bg-selected: #6cbbff;
  --ms-option-bg-selected-pointed: #6cbbff;
  --ms-tag-color: #fff;
}
</style>
