<script setup lang="ts">
import type { ComponentProps } from 'vue-component-type-helpers'
import Multiselect from '@vueform/multiselect'

const props = defineProps</* @vue-ignore */ComponentProps<typeof Multiselect>>()

const { t } = useI18n()
</script>

<template>
  <Multiselect
    v-bind="props"
    label="label"
    value-prop="value"
    :no-options-text="t('select.noItem')"
    :no-results-text="t('select.noItem')"
  />
</template>

<style>
* {
  --ms-ring-color: transparent;
  --ms-tag-bg: #6cbbff;
  --ms-tag-color: #fff;
}
</style>
