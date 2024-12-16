<script setup lang="ts">
// @ts-expect-error missing types
import StepProgress from 'vue-step-progress'
import { stepProgressParams } from '~/constants'

const { currentStep } = defineProps<{
  currentStep: number
  steps: string[]
}>()
</script>

<template>
  <StepProgress
    :steps
    :current-step
    icon-class="text-4xl fa fa-check"
    v-bind="stepProgressParams"
  />
</template>
