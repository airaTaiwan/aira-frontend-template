<script setup lang="ts">
import { CLoadingButton } from '@coreui/vue-pro'
import { objectOmit } from '@vueuse/shared'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    active?: boolean
    as?: string
    color?: string
    disabled?: boolean
    shape?: string
    size?: string
    type?: string
    variant?: string
  }>(),
  {
    color: 'primary',
    disabled: false,
  },
)
const attr = useAttrs()

const isLoading = ref(false)

async function handleClick() {
  isLoading.value = true

  try {
    // @ts-expect-error ignore
    await attr.onClick?.()
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <CLoadingButton :loading="isLoading" v-bind="{ ...objectOmit($attrs, ['onClick']), ...props }" @click="handleClick">
    <slot />
  </CLoadingButton>
</template>
