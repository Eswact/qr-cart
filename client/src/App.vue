<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Marquee from './components/Marquee.vue';
import BasketModal from './components/BasketModal.vue';
import InstallModal from './components/InstallModal.vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const route = useRoute()
const isNotFound = computed(() => {
    return route.name === 'not-found'
});

const basketModalVisible = ref(false);
const showInstallModal = ref(false);
let deferredPrompt = null;

onMounted(() => {
  window.addEventListener('beforeunload', warnIfCartNotEmpty);
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallModal.value = true;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', warnIfCartNotEmpty);
});

watch(
  () => cartStore.$state.items.length,
  (newLength) => {
    if (newLength === 0) {
      basketModalVisible.value = false;
    }
  }
);

const warnIfCartNotEmpty = (event) => {
  if (cartStore.$state.items.length > 0) {
    event.preventDefault();
    event.returnValue = 'Sepetinizde ürünler var. Sayfadan ayrılmak istediğinize emin misiniz?';
  }
};

const openBasketModal = () => {
    basketModalVisible.value = true;
};
const closeBasketModal = () => {
    basketModalVisible.value = false;
};

const hideInstallModal = () => {
  showInstallModal.value = false;
};
const handleInstall = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log(
      choiceResult.outcome === 'accepted'
        ? 'User accepted the install prompt'
        : 'User dismissed the install prompt'
    );
    deferredPrompt = null;
  }
  hideInstallModal();
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
    <InstallModal
      v-if="showInstallModal"
      @confirm="handleInstall"
      @cancel="hideInstallModal"
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
