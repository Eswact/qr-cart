const defaultLimit = 99;
const defaultCurrency = '₺';

const productFunctions = {
    getDefaultLimit: function () {
        return defaultLimit;
    },
    getDefaultCurrency: function () {
        return defaultCurrency;
    },
    calculatePriceWithOptions: function (basePrice, options) {
        let totalPrice = basePrice;
        for (const [key, value] of Object.entries(options || {})) {
            if (value.price > 0) {
                totalPrice += value.price;
            }
        }
        return totalPrice;
    },
    calculateTotalPrice: function (price, quantity) {
        return price * quantity;
    },
};
  
export default productFunctions;