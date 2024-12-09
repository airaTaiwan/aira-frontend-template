<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div h="[calc(100%-4rem)]" w-full class="grid-container">
    <!-- SideBar -->
    <SideBar class="side-bar" bg-hex-2c2c2c>
      <div h-full w-full>
        I am SideBar
      </div>
    </SideBar>

    <!-- Main -->
    <div class="main">
      I am Main
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-rows: 0 15.3125rem repeat(10, 1fr) 0;
  grid-template-columns: auto 9.875rem 9.875rem repeat(8, 1fr) 0;
  gap: 1.5rem;
  grid-template-areas:
    'sidebar . . . . . . . . . . .'
    'sidebar main main main main main main main main main main .'
    'sidebar main main main main main main main main main main .'
    'sidebar main main main main main main main main main main .'
    'sidebar main main main main main main main main main main .'
    'sidebar main main main main main main main main main main .'
    'sidebar main main main main main main main main main main .'
    'sidebar main main main main main main main main main main .'
    'sidebar main main main main main main main main main main .'
    'sidebar main main main main main main main main main main .'
    'sidebar main main main main main main main main main main .'
    'sidebar main main main main main main main main main main .'
    'sidebar . . . . . . . . . . .';
}

.side-bar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}
</style>
