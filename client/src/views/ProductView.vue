<script setup>
    import { useCartStore } from '@/stores/cart';
    import { ref, onMounted, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import AjaxScripts from '@/scripts/ajaxScripts';
    import commonFunctions from '@/scripts/common';
    import { useI18n } from 'vue-i18n';

    const cartStore = useCartStore();

    const router = useRouter();
    const { locale } = useI18n();

    const product = ref({});
    const quantity = ref(1);
    const limit = ref(cartStore.defaultLimit);
    const priceOfOptions = ref(0);
    const selectedOptions = ref({});

    const addToCart = () => {
        cartStore.addToCart(product.value, quantity.value, selectedOptions.value);
        console.log(cartStore.$state);
        quantity.value = 1;
        selectedOptions.value = {};
        resetProductOptions();
    };

    onMounted(() => {
        getProduct();

        watch(product, (newProduct) => {
            if (newProduct.props) {
                newProduct.props.forEach(property => {
                    if (property.type === 'select') {
                        const defaultOption = property.values.find(option => option.default);
                        if (defaultOption) {
                            selectedOptions.value[property.id] = defaultOption;
                        }
                    }
                });
            }
        });
    });

    watch(selectedOptions, (newOptions) => {
        priceOfOptions.value = Object.values(newOptions).reduce((acc, option) => acc + (option.price || 0), 0);
    }, { deep: true });

    const getProduct = function () {
        let onSuccess = function (res) {
            product.value = res.find(product => product.id == router.currentRoute.value.params.id);
            if (product.value.limit) { limit.value = product.value.limit; }
        };
        let onError = function (err) {
            console.warn(err);
        };
        AjaxScripts.getProducts({ onSuccess, onError });
    };

    const increaseQuantity = function() {
        if (quantity.value + 1 <= limit.value) {
            quantity.value = quantity.value + 1;
        }
    }
    const decreaseQuantity = function() {
        if (quantity.value - 1 >= 1) {
            quantity.value = quantity.value - 1;
        }
    }

    const getOptionName = function(option) {
        return locale.value === 'tr' ? option.name : option.nameEn;
    }
    const getProductName = function(product) {
        return locale.value === 'tr' ? product.name : product.nameEn;
    }

    const resetProductOptions = function() {
        if (product.value.props) {
            product.value.props.forEach(property => {
                if (property.type === 'select') {
                    const defaultOption = property.values.find(option => option.default);
                    if (defaultOption) {
                        selectedOptions.value[property.id] = defaultOption;
                    }
                }
            });
        }
    }
</script>

<template>
    <div class="w-full flex flex-col gap-4">
        <div class="w-full">
            <button @click="router.back" class="text-3xl px-4"><font-awesome-icon class="pt-[2px]" icon="fa-solid fa-arrow-left-long" /></button>
        </div>
        <div class="w-full h-full flex flex-col items-center justify-center gap-8">
            <div class="h-[200px] w-[200px] flex items-center justify-center">
                <img :src="product.image" :alt="product.name" class="h-full w-auto" onerror="this.src='/no-image.png'"/>
            </div>
            <div class="w-[300px] flex flex-col justify-center items-center gap-8">
                <div class="w-full flex flex-col items-center gap-2">
                    <h1 class="text-4xl text-center font-semibold text-black dark:text-white">{{ getProductName(product) }}</h1>
                    <p class="text-2xl text-center font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(product.price + priceOfOptions) }}</p>
                </div>
                <div class="w-full flex flex-col items-center justify-center gap-4">
                    <div v-for="property in product.props" :key="property.id" class="w-full flex flex-col items-center gap-2">
                        <div v-if="property.type == 'select'" class="w-full flex items-center justify-between">
                            <select v-model="selectedOptions[property.id]" class="w-full text-xl py-2 text-dark dark:text-white bg-transparent">
                                <option v-for="option in property.values" :key="option.name" :value="option" :selected="option.default" class="dark:text-black text-lg">
                                    {{ getOptionName(option) }}
                                    {{ (option.price > 0) ? `(+${commonFunctions.convert2PriceWithUnit(option.price)})` : `` }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="w-full flex flex-col items-center justify-center gap-2">
                    <div class="w-full flex items-center justify-between">
                        <button @click="decreaseQuantity" class="px-4 py-2 text-xl border-2 border-fourth bg-fourth text-white rounded-lg disabled:text-fourth disabled:bg-transparent" :disabled="quantity == 1"><font-awesome-icon icon="fa-solid fa-minus" /></button>
                        <span class="text-2xl font-bold">{{ quantity }}</span>
                        <button @click="increaseQuantity" class="px-4 py-2 text-xl border-2 border-fourth bg-fourth text-white rounded-lg disabled:text-fourth disabled:bg-transparent" :disabled="quantity == limit"><font-awesome-icon icon="fa-solid fa-plus" /></button>
                    </div>
                    <button @click="addToCart" class="w-full bg-third text-2xl font-semibold text-white px-4 py-2 rounded-md shadow-lg hover:bg-fourth duration-200">{{ $t('add2basket') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>