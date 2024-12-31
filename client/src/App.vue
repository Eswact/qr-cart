<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Marquee from './components/Marquee.vue';

const route = useRoute()
const isNotFound = computed(() => {
    return route.name === 'not-found'
});
</script>

<template>
  <main class="custom-bg w-full h-full min-h-[100dvh] flex flex-col items-center">
    <header v-if="!isNotFound" class="z-20 fixed w-full h-[100px] bg-main dark:bg-third flex items-center justify-center shadow-md">
      <Header class="max-w-[1200px] w-full h-full px-4 py-2" />
    </header>
    <Marquee v-if="!isNotFound" class="mt-[100px] w-full h-[40px] flex items-center" 
      :duration="120"
      :repeat="4"
    />
    <RouterView class="max-w-[1200px] w-full h-full p-4"/>
  </main>
</template>

<style scoped>
  .custom-bg {
    background-image: url('/paper.svg');
    background-repeat: repeat;
    background-position: center center;
  }
</style>
