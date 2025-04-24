<script setup lang="ts">
const user = useUserStore()

const router = useRouter()

onBeforeMount(() => {
  user.logout()
  router.push('/login')
})
</script>

<template>
  <RouterView />
</template>

<route lang="yaml">
meta:
  layout: false
</route>
