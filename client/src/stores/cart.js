import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
const defaultLimit = 99;

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
    }),
    getters: {
        defaultLimit: () => defaultLimit,
        totalItems: (state) => state.items.reduce((total, item) => total + 1, 0),
        totalPrice: (state) => state.items.reduce((total, item) => total + item.totalPrice, 0),
    },
    actions: {
        addToCart(product, quantity = 1, options = {}) {
            const existingItem = this.items.find(item => item.productId === product.id && JSON.stringify(item.options) === JSON.stringify(options));
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                let productPrice = product.price;
                if (options != {} && options != null) {
                    for (const [key, value] of Object.entries(options)) {
                        if (value.price > 0) {
                            productPrice += value.price;
                        }
                    }
                }
                this.items.push({
                    id: uuidv4(),
                    productId: product.id,
                    name: product.name,
                    nameEn: product.nameEn,
                    image: product.Image,
                    price: productPrice,
                    quantity,
                    limit: product.limit || defaultLimit,
                    totalPrice: productPrice * quantity,
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