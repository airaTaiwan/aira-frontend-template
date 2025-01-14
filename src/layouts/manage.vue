<template>
  <div flex="~ items-stretch" style="height: calc(100% - 4rem)">
    <Nav />
    <div p="x-5 y-3" :style="{ width: `calc(100% - ${sideBarVisible ? '16rem' : '3.125rem'})` }">
      <RouterView />
    </div>
  </div>
</template>
