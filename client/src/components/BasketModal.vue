<script setup>
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useCartStore } from '@/stores/cart';
    import { createQRCode } from '@/services/qrCode';
    import commonFunctions from '@/scripts/common';
    const cartStore = useCartStore();
    const { locale } = useI18n();
    const qrCodeData = ref(null);
    const emit = defineEmits(['close']);

    const generateQRCode = async () => {
        try {
            const cartItems = cartStore.$state.items;
            const cartData = cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
            }));
            qrCodeData.value = await createQRCode(JSON.stringify(cartData))
        } catch (error) {
            console.error('QR Code generation failed:', error);
        }
    };
    const downloadQrCode = () => {
        if (!qrCodeData.value) return;
        const link = document.createElement('a');
        link.href = qrCodeData.value;
        link.download = 'qrcode.png';
        link.click();
    };
    const closeQRCodeModal = () => {
        qrCodeData.value = null;
    };

    const increaseQuantity = function(id, quantity, limit) {
        if (quantity + 1 <= limit) {
            quantity = quantity + 1;
        }
        cartStore.updateQuantity(id, quantity);
    }
    const decreaseQuantity = function(id, quantity) {
        if (quantity - 1 >= 1) {
            quantity = quantity - 1;
        }
        cartStore.updateQuantity(id, quantity);
    }
</script>
<template>
    <div id="basketModal" @click.self="emit('close')" class="z-30 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
        <div class="relative w-full h-full max-w-[600px] max-h-[800px] sm:max-w-full sm:max-h-full bg-bg text-black flex flex-col justify-between gap-4 rounded-lg p-4">
            <div class="w-full flex justify-between items-center pb-2 border-b-2 border-second">
                <h1 class="text-2xl font-bold text-second">{{ $t('basket.title') }}</h1>
                <button @click="emit('close')" class="px-2 text-4xl text-red-600"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
            </div>
            <ul class="w-full h-full py-2 pr-4 flex flex-col gap-4 overflow-y-auto">
                <li v-for="item in cartStore.$state.items" :key="item.id" class="w-full h-[100px] sm:h-auto flex sm:flex-col items-center justify-between gap-4 border-main border-2 p-2 rounded-lg shadow-md">
                    <div class="w-[50%] sm:w-full h-full flex items-center justify-center">
                        <img :src="item.image || '/no-image.png'" :alt="commonFunctions.getLocalizedName(item, locale)" class="h-full max-h-[100px] w-[50%] pr-2 object-contain"/>
                        <div class="w-[50%] h-full flex flex-col items-start justify-around gap-1">
                            <h3 class="text-2xl text-start font-semibold text-black w-full overflow-hidden text-ellipsis">{{ commonFunctions.getLocalizedName(item, locale) }}</h3>
                            <div  v-if="Object.values(item.options).some(opt => opt.price > 0)" class="w-full flex items-center gap-1 overflow-hidden">
                                <span 
                                    class="text-sm font-semibold text-start overflow-hidden text-main text-ellipsis whitespace-nowrap" 
                                    :title="Object.values(item.options)
                                    .filter(opt => opt.price > 0)
                                    .map(opt => commonFunctions.getLocalizedName(opt, locale))
                                    .join(', ')"
                                >
                                    {{ Object.values(item.options)
                                    .filter(opt => opt.price > 0)
                                    .map(opt => commonFunctions.getLocalizedName(opt, locale))
                                    .join(', ') }}
                                </span>
                            </div>
                            <p class="w-full text-lg text-start overflow-hidden text-ellipsis font-bold text-fourth">{{ commonFunctions.convert2PriceWithUnit(item.price) }}</p>
                        </div>
                    </div>
                    <div class="w-[50%] sm:w-full flex items-center justify-between sm:justify-center gap-4">
                        <div class="w-full flex items-center justify-center sm:justify-start">
                            <button @click="decreaseQuantity(item.id, item.quantity)" class="px-3 py-1 text-xl border-2 border-fourth bg-fourth text-white rounded-lg disabled:text-fourth disabled:bg-transparent" :disabled="item.quantity <= 1"><font-awesome-icon icon="fa-solid fa-minus" /></button>
                            <span class="text-xl font-bold w-12 inline-block text-center">{{ item.quantity }}</span>
                            <button @click="increaseQuantity(item.id, item.quantity, item.limit)" class="px-3 py-1 text-xl border-2 border-fourth bg-fourth text-white rounded-lg disabled:text-fourth disabled:bg-transparent" :disabled="item.quantity >= item.limit"><font-awesome-icon icon="fa-solid fa-plus" /></button>
                        </div>
                        <button @click="cartStore.removeFromCart(item.id)" class="px-3 py-1 text-xl font-bold bg-red-500 border-2 border-red-500 text-white rounded-lg"><font-awesome-icon icon="fa-solid fa-trash-can" /></button>
                    </div>
                </li>
            </ul>
            <div class="w-full flex flex-col gap-2 justify-center items-center pt-2 border-t-2 border-second">
                <div class="w-full flex justify-between gap-4 sm:flex-col sm:gap-2">
                    <div class="flex items-end gap-2 sm:items-center sm:justify-between sm:px-2">
                        <span class="text-lg font-semibold text-second">{{ $t('basket.item') }}: </span>
                        <span class="text-2xl font-bold">{{ cartStore.totalItems }}</span>
                    </div>
                    <div class="flex items-end gap-2 sm:items-center sm:justify-between sm:px-2">
                        <span class="text-lg font-semibold text-second">{{ $t('basket.totalPrice') }}: </span>
                        <span class="text-2xl font-bold">{{ commonFunctions.convert2PriceWithUnit(cartStore.totalPrice) }}</span>
                    </div>
                </div>
                <button @click="generateQRCode" class="w-full text-center text-xl font-bold bg-fourth p-2 text-white rounded-xl">{{ $t('basket.createQr') }}</button>
                <button @click="cartStore.clearCart" class="w-full text-center text-xl font-bold bg-red-600 p-2 text-white rounded-xl">{{ $t('basket.clearBasket') }}</button>
            </div>
        </div>
    </div>

    <div v-if="qrCodeData" @click.self="closeQRCodeModal" class="z-40 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
        <div class="relative bg-white p-4 sm:w-full sm:h-full flex flex-col gap-2 justify-center items-center rounded-lg">
          <img :src="qrCodeData" alt="QR Kodu" class="mx-auto"/>
          <button @click="downloadQrCode" class="w-full px-4 py-2 bg-green-500 text-white rounded-lg">{{ $t('basket.downloadQr') }}</button>
          <button @click="closeQRCodeModal" class="w-full px-4 py-2 bg-red-500 text-white rounded-lg">{{ $t('basket.closeQr') }}</button>
        </div>
    </div>
</template>