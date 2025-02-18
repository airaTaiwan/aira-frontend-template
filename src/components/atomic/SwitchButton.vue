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
    border="~ white"
    bg-ctrl-secondary grid rounded-full text-base
    :style="`grid-template-columns: repeat(${options.length}, 1fr)`"
  >
    <div
      v-for="(item, idx) in options"
      :key="item.value"
      text="center base hover:text-white"
      hover:bg-ctrl-primary relative h-full min-w-25 cursor-pointer overflow-hidden whitespace-nowrap py-2 leading-4
      :class="[item.value === value ? '!bg-ctrl-primary !text-white' : '']"
      :style="{ 'border-radius': borderRaiusStyle(idx) }"
      @click="value = item.value"
    >
      <template v-if="item.text">
        <p overflow-hidden text-ellipsis whitespace-nowrap px-2>
          {{ item.text }}
        </p>
      </template>
      <template v-if="item.icon">
        <div :class="item.icon" mx-a h-4 w-4 />
      </template>
    </div>
  </div>
</template>
