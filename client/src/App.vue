<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Marquee from './components/Marquee.vue';
import BasketModal from './components/BasketModal.vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const route = useRoute()
const isNotFound = computed(() => {
    return route.name === 'not-found'
});

const warnIfCartNotEmpty = (event) => {
  if (cartStore.$state.items.length > 0) {
    event.preventDefault();
    event.returnValue = 'Sepetinizde ürünler var. Sayfadan ayrılmak istediğinize emin misiniz?';
  }
};

onMounted(() => {
  window.addEventListener('beforeunload', warnIfCartNotEmpty);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', warnIfCartNotEmpty);
});

const basketModalVisible = ref(false);
watch(
  () => cartStore.$state.items.length,
  (newLength) => {
    if (newLength === 0) {
      basketModalVisible.value = false;
    }
  }
);
const openBasketModal = () => {
    basketModalVisible.value = true;
};
const closeBasketModal = () => {
    basketModalVisible.value = false;
};
</script>

<template>
  <main class="custom-bg w-full h-full min-h-[100dvh] flex flex-col items-center">
    <header v-if="!isNotFound" class="z-20 fixed w-full h-[100px] sm:h-[80px] bg-main dark:bg-third flex items-center justify-center shadow-md">
      <Header class="max-w-[1200px] w-full h-full px-4 py-2" />
    </header>
    <Marquee v-if="!isNotFound" class="mt-[100px] w-full h-[40px] flex items-center sm:hidden" 
      :duration="120"
      :repeat="4"
    />
    <BasketModal 
      v-if="basketModalVisible" 
      @close="closeBasketModal" 
    />
    <button v-if="!isNotFound && cartStore.$state.items.length > 0" @click="openBasketModal" class="z-10 fixed bottom-0 text-2xl sm:w-full sm:py-4 py-2 px-8 bg-fourth text-white rounded-t-2xl duration-200 hover:py-4 flex items-center justify-center gap-2 shadow-md">
      <font-awesome-icon icon="fa-solid fa-basket-shopping" />
      <span class="font-bold text-base">({{ cartStore.$state.items.length }})</span>
    </button>
    <RouterView class="max-w-[1200px] w-full h-full p-4 pb-12 sm:pb-16 sm:mt-[80px]"/>
  </main>
</template>

<style scoped>
  .custom-bg {
    background-image: url('/paper.svg');
    background-repeat: repeat;
    background-position: center center;
  }
</style>
