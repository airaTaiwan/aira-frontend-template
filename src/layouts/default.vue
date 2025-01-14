<script setup lang="ts">
</script>

<template>
  <div
    :style="{
      background: isDark ? 'url(/images/bg.svg)' : '#ebedef',
    }"
    h-full w-full color-base
    bg="cover no-repeat fixed center"
  >
    <TheHeader />
    <RouterView />
  </div>
</template>
