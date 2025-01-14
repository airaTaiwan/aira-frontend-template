<script setup lang="ts">
import { CSidebarToggler } from '@coreui/vue-pro'

const { maxWidth = 16, placement = 'left' } = defineProps<{
  maxWidth?: number
  placement?: 'left' | 'right'
}>()

defineEmits<{
  toggle: []
}>()

const width = computed(() => (sideBarVisible.value ? maxWidth : 3.125))

function toggleSideBar() {
  sideBarVisible.value = !sideBarVisible.value
}
</script>

<template>
  <aside
    id="sideBar"
    flex="~ col" of-hidden
    bg-hex-3c4b64
    transition="all duration-300"
    :class="[placement.toString(), sideBarVisible ? 'open' : '']"
    :style="{ width: `${width}rem` }"
  >
    <CSidebarToggler
      class="transition-transform duration-300"
      :class="[!sideBarVisible && 'rotate-180', placement === 'left' ? 'ml-auto' : 'mr-auto']"
      @click="toggleSideBar"
    />
    <Transition name="slide-fade" mode="out-in" appear>
      <slot v-if="sideBarVisible" />
    </Transition>
    <slot v-if="!sideBarVisible" name="disappear" />
  </aside>
</template>

<style scoped>
:deep(.sidebar-toggler) {
  --cui-sidebar-toggler-color: #fff;
  --cui-sidebar-toggler-hover-color: #fff;
  --cui-sidebar-toggler-focus-color: #fff;
  --cui-sidebar-toggler-width: 3.125rem;
  --cui-sidebar-toggler-height: 3.125rem;
  padding: 0;
  background: unset;
  transition: none;
  box-shadow: none;
}

#sideBar.left :deep(.sidebar-toggler) {
  --cui-sidebar-toggler-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMUwxIDlNMSA5TDkgMTdNMSA5SDE3IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K');
}

#sideBar.right :deep(.sidebar-toggler) {
  --cui-sidebar-toggler-icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTdMMTcgOU0xNyA5TDkgMC45OTk5OTlNMTcgOUwxIDkiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=');
}

.slide-fade-enter-active {
  transition: opacity 0.4s;
}

.slide-fade-leave-active {
  transition: opacity 0.05s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
