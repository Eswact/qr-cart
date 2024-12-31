import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
    }),
    getters: {
        totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    },
    actions: {
        addToCart(product, quantity = 1, options = {}) {
            const existingItem = this.items.find(item => item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options));
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    options,
                });
            }
        },
        removeFromCart(productId) {
            this.items = this.items.filter(item => item.id !== productId);
        },
        updateQuantity(productId, quantity) {
            const item = this.items.find(item => item.id === productId);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        clearCart() {
            this.items = [];
        },
    },
});