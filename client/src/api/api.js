import axios from 'axios';

const baseURL = process.env.REACT_APP_API_ENDPOINT;
const instance = axios.create({
    baseURL,
    timeout: 20000
});

export const shopify = {
    getListProduct(search) {
      return instance.get(`/products?keyword=${search}`);
    },
};