<script setup lang="ts">
import { CImage } from '@coreui/vue-pro'
import { format } from 'date-fns'

const { t } = useI18n()
const now = useNow()

const today = computed(() => format(now.value, 'yyyy/MM/dd'))
const currentTime = computed(() => format(now.value, 'HH:mm:ss'))
</script>

<template>
  <div
    relative
    flex="~ items-center justify-between" h-16 w-full bg-white p-4 text-accent
    dark="bg-head text-hex-b4bfc0"
  >
    <RouterLink v-slot="{ navigate }" to="/" custom>
      <button bg-transparent type="button" @click="navigate">
        <CImage fluid width="96" :src="isDark ? '/dark-logo.svg' : '/logo.svg'" />
      </button>
    </RouterLink>
    <div h-full flex="~ items-center" gap-x-4>
      <div text="xl">
        {{ t('role.admin') }}
      </div>
      <div bg="[#8A9192]" h-full w-px />
      <div h-full flex="~ col items-end justify-between" text-sm>
        <div text-xs lh-none>
          {{ t('header.today') }} : {{ today }}
        </div>
        <p lh-none text="xs end">
          {{ currentTime }}
        </p>
      </div>
      <RouterLink v-slot="{ navigate }" to="/manage/config/list" custom>
        <div i-cil-cog h-8 w-8 cursor-pointer transition duration-150 hover:brightness-50 @click="navigate" />
      </RouterLink>
    </div>
  </div>
</template>
