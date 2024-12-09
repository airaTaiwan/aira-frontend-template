<script setup lang="ts">
onMounted(() => {
  toggleDark(true)
})
</script>

<template>
  <main relative h-full w-full font-sans>
    <RouterView />
  </main>
</template>
