<script setup lang="ts">
import VScaleScreen from 'v-scale-screen'
import { Toaster } from 'vue-sonner'
import { VxeUI } from 'vxe-pc-ui'

const route = useRoute()

const isNotAutoScale = computed(() => AutoScaleRegexp.test(route.path))

watchEffect(() => {
  if (WhitePageRegexp.test(route.path)) {
    toggleDark(false)
    VxeUI.setTheme('light')
    document.documentElement.setAttribute('data-coreui-theme', 'light')
  }
  else {
    toggleDark(true)
    VxeUI.setTheme('dark')
    document.documentElement.setAttribute('data-coreui-theme', 'dark')
  }
})
</script>

<template>
  <main v-if="isNotAutoScale" id="main" relative h-full w-full bg-white text-white font-sans>
    <RouterView />
    <Toaster
      rich-colors
      :theme="isDark ? 'dark' : 'light'"
    />
  </main>
  <VScaleScreen v-else width="1920" height="1080">
    <main id="main" relative h-full w-full bg-white text-white font-sans>
      <RouterView />
      <Toaster
        rich-colors
        :theme="isDark ? 'dark' : 'light'"
      />
    </main>
  </VScaleScreen>
</template>
