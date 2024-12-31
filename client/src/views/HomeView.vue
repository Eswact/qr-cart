<script setup>
  import AjaxScripts from '@/scripts/ajaxScripts';
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { locale } = useI18n();

  const categories = ref([]);

  onMounted(() => {
    getCategories();
  });

  const getCategories = function () {
    let onSuccess = function (res) {
      console.log(res);
      categories.value = res;
    };
    let onError = function (err) {
      console.warn(err);
    };
    AjaxScripts.getCategories({onSuccess, onError});
  }

  const getCategoryName = (category) => {
    return locale.value === 'tr' ? category.name : category.nameEn;
  };
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <h1 class="text-2xl font-bold">{{ $t('categories') }}</h1>
    <div class="w-full flex items-center gap-4 flex-wrap">
      <router-link v-for="category in categories" :key="category.id" :to="{name: 'category', params: {id: category.id}}"  class="relative w-[calc(20%-1rem)] xl:w-[calc(25%-1rem)] md:w-[calc(50%-0.5rem)] h-[200px] py-2 px-4 bg-white dark:bg-black text-third dark:text-main text-center flex flex-col items-center justify-around rounded-md shadow-lg hover:outline hover:outline-main focus:outline-main transition-all duration-200">
        <img :src="category.image" class="w-full h-[60%] object-contain rounded-lg overflow-hidden" :alt="category.name" onerror="this.src='/no-image.png'">  
        <h2 class="text-xl font-semibold">{{ getCategoryName(category) }}</h2>
        <span class="text-sm font-semibold text-fourth">{{ category.count }} Ürün</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
</style>
