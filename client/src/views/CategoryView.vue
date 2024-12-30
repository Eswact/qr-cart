<script setup>
import AjaxScripts from '@/scripts/ajaxScripts';
import commonFunctions from '@/scripts/common';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const products = ref([]);
const categoryName = ref('');

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
  };
  let onError = function (err) {
    console.warn(err);
  };
  AjaxScripts.getCategories({ onSuccess, onError });
};
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <h1 class="text-2xl flex items-center gap-4">
      <button @click="router.back" class="text-3xl px-4"><font-awesome-icon class="pt-[2px]" icon="fa-solid fa-arrow-left-long" /></button>
      <span class="font-semibold">{{ categoryName }}</span>
    </h1>
    <div class="w-full flex items-center gap-4 flex-wrap">
      <div
        v-for="product in products"
        :key="product.id"
        class="w-[calc(20%-1rem)] xl:w-[calc(25%-1rem)] md:w-[calc(50%-0.5rem)] h-[200px] py-2 px-4 bg-white dark:bg-black text-third dark:text-main text-center flex flex-col items-center justify-around rounded-md shadow-lg"
      >
        <img
          :src="product.image"
          class="w-full h-[60%] object-contain rounded-lg overflow-hidden"
          :alt="product.name"
          onerror="this.src='/no-image.png'"
        />
        <h2 class="text-xl font-semibold">{{ product.name }}</h2>
        <span class="text-lg font-bold text-fourth">{{ product.price }} ₺</span>
      </div>
    </div>
  </div>
</template>