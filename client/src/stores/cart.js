import { defineStore } from 'pinia';
import { generateUUID } from '@/services/uuid';
import productFunctions from '@/scripts/product';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
    }),
    getters: {
        defaultLimit: () => productFunctions.getDefaultLimit(),
        totalItems: (state) => state.items.reduce((total, item) => total + 1, 0),
        totalPrice: (state) => state.items.reduce((total, item) => total + item.totalPrice, 0),
    },
    actions: {
        addToCart(product, quantity = 1, options = {}) {
            const existingItem = this.items.find(item => item.productId === product.id && JSON.stringify(item.options) === JSON.stringify(options));
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice = productFunctions.calculateTotalPrice(existingItem.price, existingItem.quantity);
            }
            else {
                let productPrice = product.price;
                if (options) {
                    productPrice = productFunctions.calculatePriceWithOptions(productPrice, options);
                }
                this.items.push({
                    id: generateUUID(),
                    productId: product.id,
                    name: product.name,
                    nameEn: product.nameEn,
                    image: product.Image,
                    price: productPrice,
                    quantity,
                    limit: product.limit || productFunctions.getDefaultLimit(),
                    totalPrice: productFunctions.calculateTotalPrice(productPrice, quantity),
                    options,
                });
            }
        },
        removeFromCart(id) {
            this.items = this.items.filter(item => item.id !== id);
        },
        updateQuantity(id, quantity) {
            const item = this.items.find(item => item.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
                item.totalPrice = item.price * quantity;
            }
        },
        clearCart() {
            this.items = [];
        },
    },
});