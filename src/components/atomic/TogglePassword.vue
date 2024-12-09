<script setup lang="ts">
const viewPasword = defineModel<boolean>({ required: false, default: false })
</script>

<template>
  <div v-if="viewPasword" i-carbon-view-off h-4 w-4 />
  <div v-else i-carbon-view h-4 w-4 />
</template>
