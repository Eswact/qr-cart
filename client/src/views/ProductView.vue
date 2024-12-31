<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import AjaxScripts from '@/scripts/ajaxScripts';
import commonFunctions from '@/scripts/common';
    const router = useRouter();
    const product = ref({});
    onMounted(() => {
        getProduct();
    });
    const getProduct = function () {
        let onSuccess = function (res) {
            product.value = res.find(product => product.id == router.currentRoute.value.params.id);
            console.log(product.value);
        };
        let onError = function (err) {
            console.warn(err);
        };
        AjaxScripts.getProducts({ onSuccess, onError });
    };
</script>

<template>
    <div class="w-full flex flex-col gap-4">
        <div class="w-full">
            <button @click="router.back" class="text-3xl px-4"><font-awesome-icon class="pt-[2px]" icon="fa-solid fa-arrow-left-long" /></button>
        </div>
        <div class="w-full h-full flex flex-col items-center justify-center gap-8">
            <div class="h-[200px] w-[200px] flex items-center justify-center">
                <img :src="product.image" alt="product.name" class="h-full w-auto" onerror="this.src='/no-image.png'"/>
            </div>
            <div class="w-[300px] flex flex-col justify-center items-center gap-8">
                <div class="w-full flex flex-col items-center gap-2">
                    <h1 class="text-4xl text-center font-semibold text-black dark:text-white">{{ product.name }}</h1>
                    <p class="text-2xl text-center font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(product.price) }}</p>
                </div>
                <div class="w-full flex flex-col items-center justify-center gap-4">
                    <div v-for="property in product.props" :key="property.id" class="w-full flex flex-col items-center gap-2">
                        <div v-if="property.type == 'checkbox'" class="w-full">
                            <span>{{ property.name }}:</span>
                            <span>{{ property.value ? 'Var' : 'Yok' }}</span>
                        </div>
                        <div v-if="property.type == 'select'" class="w-full">
                            <select class="w-full">
                                <option v-for="option in property.values" :key="option.name" :value="option.name" :selected="option.default">{{ option.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="w-full flex flex-col items-center justify-center gap-2">
                    <button class="w-full bg-third text-2xl font-semibold text-white px-4 py-2 rounded-md shadow-lg hover:bg-fourth duration-200">Sepete Ekle</button>
                </div>
            </div>
        </div>
    </div>
</template>