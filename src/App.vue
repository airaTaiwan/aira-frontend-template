<script setup lang="ts">
import VScaleScreen from 'v-scale-screen'

const route = useRoute()

const isNotAutoScale = computed(() => AutoScaleRegexp.test(route.path))

watchEffect(() => {
  if (WhitePageRegexp.test(route.path)) {
    toggleDark(false)
    document.documentElement.setAttribute('data-coreui-theme', 'light')
  }
  else {
    toggleDark(true)
    document.documentElement.setAttribute('data-coreui-theme', 'dark')
  }
})
</script>

<template>
  <main v-if="isNotAutoScale" id="main" relative h-full w-full bg-white text-white font-sans>
    <RouterView />
  </main>
  <VScaleScreen v-else width="1920" height="1080">
    <main id="main" relative h-full w-full bg-white text-white font-sans>
      <RouterView />
    </main>
  </VScaleScreen>
</template>
