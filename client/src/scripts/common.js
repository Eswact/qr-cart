import productFunctions from "./product";
const commonFunctions = {
    convert2PriceWithUnit: function (value, unit) {
        let unitName = productFunctions.getDefaultCurrency();
        if (unit != null && unit != undefined) { unitName = unit };
        if (value != null && value != undefined) {
            let str = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            str = str.replace(/\./, "x");
            str = str.replace(/,/g, ".");
            str = str.replace(/x/, ",");
            return str + ` ${unitName}`;
        }
        else {
            return `0,00 ${unitName}`;
        }
    },
    getLocalizedName: function (entity, locale) {
        return (locale === 'tr') ? entity.name : entity.nameEn;
    } 
};
  
export default commonFunctions;