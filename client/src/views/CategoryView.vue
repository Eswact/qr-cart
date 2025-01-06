<script setup>
import AjaxScripts from '@/scripts/ajaxScripts';
import commonFunctions from '@/scripts/common';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const products = ref([]);
const categoryName = ref('');
const categoryNameEn = ref('');

onMounted(() => {
  getProductsByCategory(route.params.id);
  getCategoryName(route.params.id);
});

const getProductsByCategory = function (categoryId) {
  let onSuccess = function (res) {
    products.value = res.filter(product => product.categoryId == categoryId);
  };
  let onError = function (err) {
    console.warn(err);
  };
  AjaxScripts.getProducts({ onSuccess, onError });
};

const getCategoryName = function (categoryId) {
  let onSuccess = function (res) {
    categoryName.value = res.find(category => category.id == categoryId).name;
    categoryNameEn.value = res.find(category => category.id == categoryId).nameEn;
  };
  let onError = function (err) {
    console.warn(err);
  };
  AjaxScripts.getCategories({ onSuccess, onError });
};

const getCategoryNameLanguage = () => {
    return locale.value === 'tr' ? categoryName.value : categoryNameEn.value;
};
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <h1 class="text-2xl flex items-center gap-4">
      <button @click="router.push('/')" class="text-3xl px-4"><font-awesome-icon class="pt-[2px]" icon="fa-solid fa-arrow-left-long" /></button>
      <span class="font-semibold">{{ getCategoryNameLanguage() }}</span>
    </h1>
    <div class="w-full flex items-center gap-4 flex-wrap">
      <router-link
        v-for="product in products"
        :key="product.id"
        :to="{name: 'product', params: {id: product.id}}"
        class="relative w-[calc(20%-1rem)] xl:w-[calc(25%-1rem)] md:w-[calc(50%-0.5rem)] h-[200px] py-2 px-4 bg-white dark:bg-black text-third dark:text-main text-center flex flex-col items-center justify-around rounded-md shadow-lg hover:outline hover:outline-main focus:outline-main transition-all duration-200"
      >
        <div v-if="cartStore.items.filter(x => x.productId == product.id) != ''" class="absolute top-1 right-1 bg-third text-white px-2 rounded-lg flex justify-center items-center">
          <span class="font-bold text-[1.2rem]">{{ cartStore.items.filter(x => x.productId == product.id).reduce((total, item) => total + item.quantity, 0) }}</span>
        </div>
        <img
          :src="product.image"
          class="w-full h-[60%] object-contain rounded-lg overflow-hidden"
          :alt="product.name"
          onerror="this.src='/no-image.png'"
        />
        <h2 class="text-xl font-semibold">{{ commonFunctions.getLocalizedName(product, locale) }}</h2>
        <span class="text-lg font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(product.price) }}</span>
      </router-link>
    </div>
  </div>
</template>