<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div h="[calc(100%-4rem)]" w-full p-4 class="grid-container">
    <!-- Main -->
    <div class="main">
      {{ frontEndVersion }}
      <DatePicker />
      <MultiSelect />
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  gap: 1.5rem;
  grid-template-areas:
    'main main main main main main main main main main main'
    'main main main main main main main main main main main'
    'main main main main main main main main main main main'
    'main main main main main main main main main main main'
    'main main main main main main main main main main main'
    'main main main main main main main main main main main'
    'main main main main main main main main main main main'
    'main main main main main main main main main main main'
    'main main main main main main main main main main main'
    'main main main main main main main main main main main'
    'main main main main main main main main main main main';
}

.main {
  grid-area: main;
}
</style>
