<script lang="ts">
export interface SwitchOptions {
  value: string
  text?: string
  icon?: string
}
</script>

<script setup lang="ts">
const { options = [] } = defineProps<{
  options: SwitchOptions[]
}>()

const value = defineModel({ required: false, default: '' })

function borderRaiusStyle(idx: number) {
  if (idx === 0) {
    return '9999px 0 0 9999px'
  }
  if (idx === options.length - 1) {
    return '0 9999px 9999px 0'
  }
  return ''
}
</script>

<template>
  <div
    flex="~ items-center"
    border="~ white"

    bg-ctrl-secondary rounded-full text-base
    style="min-width: 12rem"
  >
    <div
      v-for="(item, idx) in options"
      :key="item.value"
      text="center base hover:text-white" hover:bg-ctrl-primary relative h-full cursor-pointer py-2 leading-4
      :class="[item.value === value ? '!bg-ctrl-primary !text-white' : '']"
      :style="{ 'border-radius': borderRaiusStyle(idx) }"
      style="width: 100%"
      @click="value = item.value"
    >
      <template v-if="item.text">
        {{ item.text }}
      </template>
      <template v-if="item.icon">
        <div :class="item.icon" mx-a h-4 w-4 />
      </template>
    </div>
  </div>
</template>
