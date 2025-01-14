<script setup lang="ts">
const route = useRoute()

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
  <main relative h-full w-full font-sans>
    <RouterView />
  </main>
</template>
