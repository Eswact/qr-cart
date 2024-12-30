import { fetchData, postData } from '../services/ajaxServices';

const AjaxScripts = {
  getCategories: function ({ onSuccess, onError }) {
    fetchData(`exampleData/categories.json`, onSuccess, onError);
  },
  getProducts: function ({ onSuccess, onError }) {
    fetchData(`exampleData/products.json`, onSuccess, onError);
  },
};

export default AjaxScripts;